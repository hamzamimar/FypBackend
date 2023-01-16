const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('userSchema', schema.userSchema, 'users')

const CheckUserForForgotPassword = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber
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

module.exports = CheckUserForForgotPassword