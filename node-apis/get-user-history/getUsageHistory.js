const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('findUserModel', schema.findUserSchema, 'users')

const GetUsageHistory = app.post('/', (req, res) => {
    const mobileNumber = {
        mobileNumber: req.body.mobileNumber
    }
    model.findOne(mobileNumber, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                const stringObject = JSON.stringify(result)
                const parsedObject = JSON.parse(stringObject)
                res.send(parsedObject.usageHistory.reverse())
            }
        }
    })
})

module.exports = GetUsageHistory