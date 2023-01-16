const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('userSchema', schema.userSchema, 'users')
const serviceModel = mongoose.model('addServiceRecordModel', schema.serviceRecordSchema, 'users')



const AddServiceRecord = app.post('/', (req, res) => {
    const serviceRecord = new serviceModel({
        serviceDate: req.body.serviceDate,
        serviceType: req.body.serviceType,
        costOfService: req.body.costOfService,
        currentMileage: req.body.currentMileage,
        serviceNotesDetails: req.body.serviceNotesDetails,
        nextServiceDate: req.body.nextServiceDate
    })
    const findUser = {
        mobileNumber: req.body.mobileNumber
    }
    const pushItemInArray = {
        $push: {
            vehicleServiceRecords: serviceRecord
        }
    }
    model.findOneAndUpdate(findUser, pushItemInArray, (error, result) => {
        if (error) {
            res.send(error)
        }
        else {
            res.status(200).send('Done')
        }
    })
})

module.exports = AddServiceRecord