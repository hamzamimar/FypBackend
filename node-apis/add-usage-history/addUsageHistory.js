const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('userSchema', schema.userSchema, 'users')
const usageModel = mongoose.model('addUsageHistoryModel', schema.usageHistorySchema, 'users')



const AddUsageHistory = app.post('/', (req, res) => {
    const usageHistory = new usageModel({
        usageDate: req.body.usageDate,
        costOfService: req.body.costOfService,
        userLocation: req.body.userLocation,
        helperLocation: req.body.helperLocation,
        helperDetails: req.body.helperDetails
    })
    const findUser = {
        mobileNumber: req.body.mobileNumber
    }
    const pushItemInArray = {
        $push: {
            usageHistory: usageHistory
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

module.exports = AddUsageHistory