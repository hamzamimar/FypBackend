const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const GetTowersForMechanic = app.get('/', (req, res) => {
    const findTowers = {
        userRole: 'Tower'
    }
    model.find(findTowers, (error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send(result)
        }
    })
})

module.exports = GetTowersForMechanic