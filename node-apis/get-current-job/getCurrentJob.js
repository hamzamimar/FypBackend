const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('userSchema', schema.userSchema, 'users')

const GetUserCurrentJob = app.post('/', (req, res) => {
    const mobileNumber = {
        mobileNumber: req.body.mobileNumber
    }
    model.findOne(mobileNumber, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                res.send(result.currentJob)
            }
            else{
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = GetUserCurrentJob