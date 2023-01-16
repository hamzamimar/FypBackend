const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const UpdateHelperProfile = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    const updateData = {
        fullName: req.body.fullName,
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

module.exports = UpdateHelperProfile