const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const userModel = mongoose.model('userSchema', schema.userSchema, 'users')
const helperModel = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const UpdateCostOfService = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    const finalBillAfterServiceCost = 200 + parseInt(req.body.costOfService)
    const setCostOfService = {
        $set: {
            'currentJob.costOfService': finalBillAfterServiceCost
        }
    }
    const setCostOfServiceMechanicCallTower = {
        $set: {
            'mechanicCallTower.costOfService': finalBillAfterServiceCost
        }
    }
    if (req.body.userRole == 'user') {
        userModel.findOneAndUpdate(findUser, setCostOfService, (error, result) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.status(200).send('Done')
            }
        })
    } else {
        helperModel.findOneAndUpdate(findUser, setCostOfServiceMechanicCallTower, (error, result) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.status(200).send('Done')
            }
        })
    }
})

module.exports = UpdateCostOfService