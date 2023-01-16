const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const GetMechanicTowerJob = app.post('/', (req, res) => {
    const findHelper = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    model.findOne(findHelper, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                res.send(result.mechanicCallTower)
            }
            else {
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = GetMechanicTowerJob