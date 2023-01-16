const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const UpdateHelperActiveStatus = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    const setActiveStatus = {
        activeStatus: req.body.isActive
    }
    model.findOneAndUpdate(findUser, setActiveStatus, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else if (result) {
            res.status(200).send('Done')
        }
    })
})

module.exports = UpdateHelperActiveStatus