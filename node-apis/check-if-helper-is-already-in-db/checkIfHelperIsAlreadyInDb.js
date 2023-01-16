const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const CheckIfHelperAlreadyExistsInDatabase = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber
    }
    model.findOne(findUser, (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            if (result) {
                res.status(405).send('User already registered with this number.')
            } else {
                res.status(200).send('User not found')
            }
        }
    })
})

module.exports = CheckIfHelperAlreadyExistsInDatabase