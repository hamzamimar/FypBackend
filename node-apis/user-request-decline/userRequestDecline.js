const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')
const requestSchema = mongoose.model('sendUserRequestSchema', schema.userRequestSchema, 'helpers')
const userModel = mongoose.model('userSchema', schema.userSchema, 'users')

const DeclineUserRequest = app.post('/', (req, res) => {
    const requestData = new requestSchema({
        requestSender: req.body.user,
        requestReceiver: req.body.receiver
    })
    const findRequestReceiver = {
        mobileNumber: requestData.requestReceiver.mobileNumber,
        userRole: requestData.requestReceiver.userRole
    }
    const findRequestSender = {
        mobileNumber: requestData.requestSender.mobileNumber
    }
    const setItem = {
        $set: {
            request: null,
            freeStatus: true
        }
    }
    const setUserCurrentJob = {
        currentJob: null
    }
    model.findOne(findRequestReceiver, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                model.findOneAndUpdate(findRequestReceiver, setItem, (error, result) => {
                    if (error) {
                        res.status(500).send(error)
                    }
                    else {
                        if (result) {
                            res.status(200).send('Done')
                            // userModel.findOneAndUpdate(findRequestSender, setUserCurrentJob, (error, result) => {
                            //     if (error) {
                            //         res.status(500).send(error)
                            //     }
                            //     else {
                            //         res.status(200).send('Done')
                            //     }
                            // })
                        }
                        else {
                            res.status(404).send('User not found')
                        }
                    }
                })
            }
            else {
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = DeclineUserRequest