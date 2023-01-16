const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('findHelperSchema', schema.findHelperSchema, 'helpers')

const GetUserRequests = app.post('/', (req, res) => {
    const mobileNumber = {
        mobileNumber: req.body.helperMobileNumber,
        userRole: req.body.userRole
    }
    model.findOne(mobileNumber, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                const stringObject = JSON.stringify(result)
                const parsedObject = JSON.parse(stringObject)
                res.send(parsedObject.request)
            }
            else{
                res.status(500).send('Not found')
            }
        }
    })
})

module.exports = GetUserRequests