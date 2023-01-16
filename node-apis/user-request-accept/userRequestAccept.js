const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const helperModel = mongoose.model('helperSchema', schema.helperSchema, 'helpers')
const requestSchema = mongoose.model('sendUserRequestSchema', schema.userRequestSchema, 'helpers')
const userModel = mongoose.model('userSchema', schema.userSchema, 'users')

const AcceptUserRequest = app.post('/', (req, res) => {
    const requestData = new requestSchema({
        requestSender: req.body.sender,
        requestReceiver: req.body.receiver
    })
    const findRequestReceiver = {
        mobileNumber: requestData.requestReceiver.mobileNumber,
        userRole: requestData.requestReceiver.userRole
    }
    const findRequestSender = {
        mobileNumber: requestData.requestSender.mobileNumber,
        userRole: requestData.requestSender.userRole
    }
    const setItem = {
        $set: {
            "request.reqestAcceptanceStatus": true
        }
    }
    const setItemIfUserGotJobFromOtherRequest = {
        $set: {
            request: null,
            freeStatus: true
        }
    }
    const setUserCurrentJob = {
        currentJob: {
            usageDate: new Date(),
            costOfService: '',
            userLocation: requestData.requestSender.lastLocation,
            helperLocation: req.body.receiverLocation,
            helperDetails: {
                cnic: requestData.requestReceiver.cnic,
                fullName: requestData.requestReceiver.fullName,
                mobileNumber: requestData.requestReceiver.mobileNumber,
                typeOfService: requestData.requestReceiver.userRole
            },
        }
    }
    const setMechanicCallTower = {
        mechanicCallTower: {
            usageDate: new Date(),
            costOfService: '',
            userLocation: requestData.requestSender.lastLocation,
            helperLocation: req.body.receiverLocation,
            helperDetails: {
                cnic: requestData.requestReceiver.cnic,
                fullName: requestData.requestReceiver.fullName,
                mobileNumber: requestData.requestReceiver.mobileNumber,
                typeOfService: requestData.requestReceiver.userRole
            },
        }
    }
    console.log(req.body)
    if (requestData.requestSender.userRole == 'user') {
        helperModel.findOne(findRequestReceiver, (error, result) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                if (result) {
                    helperModel.findOneAndUpdate(findRequestReceiver, setItem, (error, result) => {
                        if (error) {
                            res.status(500).send(error)
                        }
                        else {
                            if (result) {
                                userModel.findOne(findRequestSender, (error, result) => {
                                    if (error) {
                                        res.send(error)
                                    } else {
                                        if (result) {
                                            if (result.currentJob) {
                                                helperModel.findOneAndUpdate(findRequestReceiver, setItemIfUserGotJobFromOtherRequest, (error, result) => {
                                                    if (error) {
                                                        res.status(500).send(error)
                                                    }
                                                    else {
                                                        res.status(403).send('Request sender has now gotten request from other service provider. Thank you!')
                                                    }
                                                })
                                            } else {
                                                userModel.findOneAndUpdate(findRequestSender, setUserCurrentJob, (error, result) => {
                                                    if (error) {
                                                        res.status(500).send(error)
                                                    }
                                                    else {
                                                        res.status(200).send('Done')
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                                // res.status(200).send('Done')

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
    } else {
        helperModel.findOne(findRequestReceiver, (error, result) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                if (result) {
                    helperModel.findOneAndUpdate(findRequestReceiver, setItem, (error, result) => {
                        if (error) {
                            res.status(500).send(error)
                        }
                        else {
                            if (result) {
                                helperModel.findOne(findRequestSender, (error, result) => {
                                    if (error) {
                                        res.send(error)
                                    } else {
                                        console.log('here')
                                        if (result) {
                                        console.log('here2')
                                        if (result.mechanicCallTower) {
                                                helperModel.findOneAndUpdate(findRequestReceiver, setItemIfUserGotJobFromOtherRequest, (error, result) => {
                                                    if (error) {
                                                        res.status(500).send(error)
                                                    }
                                                    else {
                                                        res.status(403).send('Request sender has now gotten request from other service provider. Thank you!')
                                                    }
                                                })
                                            } else {
                                                helperModel.findOneAndUpdate(findRequestSender, setMechanicCallTower, (error, result) => {
                                                    if (error) {
                                                        res.status(500).send(error)
                                                    }
                                                    else {
                                                        res.status(200).send('Done')
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
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
    }
})

module.exports = AcceptUserRequest