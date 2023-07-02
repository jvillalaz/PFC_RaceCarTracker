const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Car = require('../model/car')
const Category = require('../model/category')
const error = require('../model/error')

const router = new express.Router()

router.post('/cars', async (req, res, next) => {
    var car = new Car({
        ...req.body
    })
    
    try {
        const category = await Category.findById(req.body.category)
        if (!category) {
            return res.status(400).send(notFound(400, 'Category'))
        }
        await car.save()
        res.status(201).send(car)    
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.get('/cars', async (req, res, next) => {
    const {
        limit,
        offset,
        orderBy
    } = req.query

    var parsedOffset = 0
    if (offset) 
        parsedOffset = offset

    var parsedLimit = 10
    if (limit)
        parsedLimit = limit

    var order = -1
    if (orderBy) {
        if (orderBy === 'asc') order = 1
        else if (orderBy === 'desc') order = -1
        else return res.status(400).send()
    }

    const sort = {
        'createdAt': order
    }

    try {
        const cars = await Car.find(null, null, {
            limit: parseInt(parsedLimit),
            skip: parseInt(parsedOffset),
            sort
        })
        res.status(200).send(cars)
    } catch (error) {
        next(error)   
    }
})

router.get('/cars/:categoryId', async (req, res, next) => {
    const match = { category: req.params.categoryId }

    const {
        limit,
        offset,
        orderBy
    } = req.query

    var parsedOffset = 0
    if (offset) 
        parsedOffset = offset

    var parsedLimit = 10
    if (limit)
        parsedLimit = limit

    var order = -1
    if (orderBy) {
        if (orderBy === 'asc') order = 1
        else if (orderBy === 'desc') order = -1
        else return res.status(400).send()
    }

    const sort = {
        'createdAt': order
    }

    const cars = await Car.find(
        match,
        null,
        {
            limit: parseInt(parsedLimit),
            skip: parseInt(parsedOffset),
            sort
        }
    ) 
    try {
        res.send(cars)
    } catch (err) {
        next(err)
    }
})

router.patch('/cars/:id', async (req, res, next) => {
    const car = await Car.findById(req.params.id)

    const updates = Object.keys(req.body)
    if (!car) {
        return res.status(404).send(notFound(404, 'Car'))
    }

    try {
        updates.forEach((update) => car[update] = req.body[update])
        await car.save()
        res.send(car)
    } catch (err) {
        next(err)
    }
})

router.delete('/cars/:id', async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id)
        await car.remove()
        res.send(car)
    } catch (err) {
        next(err)
    }
})

module.exports = router