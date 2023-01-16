const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('getHelpersModel', schema.helperSchema, 'helpers')

const GetHelpers = app.get('/', (req, res) => {
    model.find({}, (error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send(result)
        }
    })
})

module.exports = GetHelpers