const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('userSchema', schema.userSchema, 'users')
const helperModel = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const PayWithWallet = app.post('/', (req, res) => {
    const mobileNumber = {
        mobileNumber: req.body.mobileNumber
    }
    const findHelper = {
        mobileNumber: req.body.helperDetails.mobileNumber,
        userRole: req.body.helperDetails.typeOfService
    }
    const setRequestInHelperDb = {
        $set: {
            request: null,
            freeStatus: true
        }
    }
    model.findOne(mobileNumber, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                const jobHappened = result.currentJob
                const wallet = result.walletMoney
                const bill = req.body.bill
                if (wallet - bill < 0) {
                    res.status(405).send('Not enough balance')
                }
                else {
                    const newWalletBalance = wallet - bill
                    const setWalletValue = {
                        $set: {
                            walletMoney: newWalletBalance,
                            currentJob: null
                        },
                        $push: {
                            usageHistory: jobHappened
                        }
                    }
                    model.findOneAndUpdate(mobileNumber, setWalletValue, (error, result) => {
                        if (error) {
                            res.status(500).send(error)
                        } else {
                            if (result) {
                                helperModel.findOneAndUpdate(findHelper, setRequestInHelperDb, (error, result) => {
                                    if (error) {
                                        res.status(500).send(error)
                                    } else {
                                        if (result) {
                                            res.status(200).send('Done')
                                        } else {
                                            res.sendStatus(500)
                                        }
                                    }
                                })
                            } else {
                                res.status(404).send('User not found')
                            }
                        }
                    })
                }
            }
            else {
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = PayWithWallet