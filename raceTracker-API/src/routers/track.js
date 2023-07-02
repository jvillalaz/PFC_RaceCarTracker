const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Car = require('../model/car')
const error = require('../model/error')
const Round = require('../model/round')
const Track = require('../model/track')

const router = new express.Router()

router.post('/track', async (req, res, next) => {
    try {
        const car = await Car.findById(req.body.car)
        if (!car) return notFound(400, 'Car')
        const round = await Round.findById(req.body.round)
        if (!round) return notFound(400, 'Round')

        const track = new Track({
            ...req.body,
            lap: 1
        })
        await track.save()  
        res.status(201).send(track)  
    } catch (error) {
        next(err)
    }
})

router.get('/track/current', async (req, res, next) => {
    try {
        const track = await Track.findOne({ onTrack: true })
        if(!track)
            return res.status(404).send(
                error(404, 'Track is empty.', 'There are no cars on track.')
            ) 
        res.send(track)
    } catch (err) {
        next(err)
    }
})

const updateTrack = async track => {
    try {
        if (track.lap == 5) {
            track.onTrack = false
        }
        track.lap = track.lap + 1
        await track.save()
    } catch (err) {
        throw err
    }
}

module.exports = { trackRouter: router, updateTrack }