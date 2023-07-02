const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Category = require('../model/category')
const Championship = require('../model/championship')
const Round = require('../model/round')

const router = new express.Router()
router.post('/rounds', async (req, res, next) => {

    const round = new Round({
        ...req.body
    })

    try {
        const championship = await Championship.findById(req.body.championship)
        if (!championship) {
            return res.status(400).send(notFound(400, 'championship'))
        }
        await round.save()
        res.status(201).send(round)
    } catch (err) {
        next(err)
    }
})

router.get('/rounds', async (req, res, next) => {
    const asc = 1
    try {
        const rounds = await Round.find(null, null, {
            sort: {
                name: asc
            }
        })
        res.send(rounds)     
    } catch (err) {
        next(err)
    }
})

router.get('/rounds/:id', async (req, res, next) => {
    try {
        const round = await Round.findById(req.params.id)
        res.send(round)   
    } catch (err) {
        next(err)
    }
})

router.get('/rounds/byChampionship/:id', async (req, res) => {
    try {
        const championship = await Championship.findById(req.params.id)
        if (!championship) {
            return res.status(404).send(notFound(400, 'championship'))
        }
        const rounds = await Round.find({ championship: req.params.id })
        res.send(rounds)    
    } catch (err) {
        next(err)
    }
    
})

module.exports = router