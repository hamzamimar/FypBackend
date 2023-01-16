const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('userSchema', schema.userSchema, 'users')

const UpdateUserProfile = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber
    }
    const updateData = {
        fullName: req.body.fullName,
        email: req.body.email,
        gender: req.body.gender
    }
    model.findOneAndUpdate(findUser, updateData, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).send('Done')
        }
    })
})

module.exports = UpdateUserProfile