const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const UpdateHelperLocation = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    const setLocation = {
        $set: {
            location: {
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude
            }
        }
    }
    model.findOneAndUpdate(findUser, setLocation, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                res.status(200).send('Done')
            } else {
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = UpdateHelperLocation