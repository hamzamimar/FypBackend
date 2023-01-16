const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const CheckHelperForForgotPassword = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    model.findOne(findUser, (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            if (result) {
                res.status(200).send('User found.')
            } else {
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = CheckHelperForForgotPassword