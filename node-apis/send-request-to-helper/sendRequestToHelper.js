const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const helperModel = mongoose.model('helperSchema', schema.helperSchema, 'helpers')
const requestSchema = mongoose.model('sendUserRequestSchema', schema.userRequestSchema, 'helpers')

const SendUserRequest = app.post('/', (req, res) => {
    const requestData = new requestSchema({
        requestSender: req.body.sender,
        requestReceiver: req.body.receiver
    })
    const findRequestReceiver = {
        mobileNumber: requestData.requestReceiver.mobileNumber,
        userRole: requestData.requestReceiver.userRole
    }
    const setItem = {
        request: {
            requestSender: requestData.requestSender,
            requestReceiver: requestData.requestReceiver,
            reqestAcceptanceStatus: false
        },
        freeStatus: false
    }
    helperModel.findOne(findRequestReceiver, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                if (result.freeStatus && result.activeStatus) {
                    helperModel.findOneAndUpdate(findRequestReceiver, setItem, (error, result) => {
                        if (error) {
                            res.send(error)
                        }
                        else {
                            if (result) {
                                res.status(200).send('Done')
                            }
                            else {
                                res.status(404).send('User not found')
                            }
                        }
                    })
                }
                else {
                    res.status(403).send('Helper not free')
                }
            }
            else {
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = SendUserRequest