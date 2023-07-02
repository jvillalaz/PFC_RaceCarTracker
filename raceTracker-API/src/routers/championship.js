const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Championship = require('../model/championship')
const Laptime = require('../model/laptime')
const Round = require('../model/round')

const router = new express.Router()

router.post('/championship', async (req, res, next) => {
    const championship = new Championship({
        ...req.body
    })

    try {
        await championship.save()
        res.status(201).send(championship)
    } catch (error) {
        next(error)
    }
})

router.get('/championship', async (req, res) => {
    try {
        const championships = await Championship.find()
        res.send(championships)
    } catch (err) {
        next(err)
    }
})

router.get('/championship/:id', async (req, res, next) => {
    try {
        const championship = await Championship.findById(req.params.id)
        if (!championship) {
            return res.status(404).send(
                notFound(404, 'Championship')
            )
        }
        res.status(200).send(championship)   
    } catch (err) {
        next(err)
    }
})

router.patch('/championship/:id', async (req, res, next) => {
    const championship = await Championship.findById(req.params.id)
    if (!championship) {
        return res.status(404).send(
            notFound(404, 'Championship')
        )
    }
    const updates = Object.keys(req.body)

    try {
        updates.forEach((update) => championship[update] = req.body[update])
        await championship.save()
        res.send(championship)
    } catch (err) {
        next(err)
    }
})

const searchLaps = async function(round) {
    const laptimes = await Laptime.findWithNoRound(round._id)
    if (laptimes) {
        const { _id, name } = round
        return  {
            _id, 
            name,
            laptimes
        }
    }
    return null
}

router.get('/championship/:id/finalTable/', async (req, res, next) => {
    const table = []

    try {
        const rounds = await Round
        .find( { championship: req.params.id })
        .sort("name")

    for (const round of rounds) {
        const item = await searchLaps(round)
        if (!item) {
            return res.status(400).send(
                notFound(400, 'Round')
            )
        }
        table.push(item)
    }

    res.send(table)
    } catch (err) {
        next(err)
    }
    
})

module.exports = router