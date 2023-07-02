const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Category = require('../model/category')

const router = new express.Router()
router.post('/category', async (req, res, next) => {
    const category = new Category({
        ...req.body
    })

    try {
        await category.save()
        res.status(201).send(category)
    } catch (err) {
        next(err)
    }
})

router.get('/category', async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.send(categories)   
    } catch (err) {
        next(err)
    }
})

router.get('/category/:id', async (req, res, next) => {
    const _id = req.params.id

    try {
        const category = await Category.findById(_id)
        if (!category) {
            return res.status(404).send(notFound(404, 'Category'))
        }
        res.send(category)
    } catch (err) {
        next(err)
    }
})

module.exports = router