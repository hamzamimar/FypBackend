const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('getUsersModel', schema.userSchema, 'users')

const GetServiceRecord = app.post('/', (req, res) => {
    const finduser = {
        mobileNumber: req.body.mobileNumber
    }
    model.findOne(finduser, (error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send(result.vehicleServiceRecords)
        }
    })
})

module.exports = GetServiceRecord