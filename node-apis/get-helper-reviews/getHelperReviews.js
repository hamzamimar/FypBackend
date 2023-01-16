const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('findHelperSchema', schema.findHelperSchema, 'helpers')

const GetHelperReviews = app.post('/', (req, res) => {
    const mobileNumber = {
        mobileNumber: req.body.helperMobileNumber
    }
    model.findOne(mobileNumber, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            const stringObject = JSON.stringify(result)
            const parsedObject = JSON.parse(stringObject)
            res.send(parsedObject.userReviews)
        }
    })
})

module.exports = GetHelperReviews