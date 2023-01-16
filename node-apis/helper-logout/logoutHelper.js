const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const LogHelperOut = app.post('/', (req, res) => {
    const findHelper = {
        mobileNumber: req.body.mobileNumber
    }
    const setSession = {
        session: ''
    }
    model.findOneAndUpdate(findHelper, setSession, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).send('Done')
        }
    })
})

module.exports = LogHelperOut