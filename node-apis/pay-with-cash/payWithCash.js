const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')
const userModel = mongoose.model('userSchema', schema.userSchema, 'users')
const helperModel = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const PayWithCash = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.userDetails.mobileNumber,
        userRole: req.body.userDetails.userRole
    }
    const findHelper = {
        mobileNumber: req.body.helperDetails.mobileNumber,
        userRole: req.body.helperDetails.userRole
    }
    if (req.body.userDetails.userRole == 'user') {
        userModel.findOne(findUser, (error, result) => {
            if (error) {
                res.status(500).send(error)
            } else {
                if (result) {
                    const amountInWallet = result.walletMoney
                    const bill = result.currentJob.costOfService
                    const paidMoney = req.body.cashPaid
                    const upperAmount = paidMoney - bill
                    if (upperAmount >= 0) {
                        const finalAmount = amountInWallet + upperAmount
                        const updateWallet = {
                            $set: {
                                walletMoney: finalAmount
                            }
                        }
                        userModel.findOneAndUpdate(findUser, updateWallet, (error, result) => {
                            if (error) {
                                res.status(500).send(error)
                            } else {
                                if (result) {
                                    const jobHappened = result.currentJob
                                    const setCurrentJobToNull = {
                                        $set: {
                                            currentJob: null
                                        },
                                        $push: {
                                            usageHistory: jobHappened
                                        }
                                    }
                                    userModel.findOneAndUpdate(findUser, setCurrentJobToNull, (error, result) => {
                                        if (error) {
                                            res.status(500).send(error)
                                        } else {
                                            if (result) {
                                                const setHelperRequestToNull = {
                                                    $set: {
                                                        freeStatus: true,
                                                        request: null
                                                    }
                                                }
                                                helperModel.findOneAndUpdate(findHelper, setHelperRequestToNull, (error, result) => {
                                                    if (error) {
                                                        res.status(500).send(error)
                                                    } else {
                                                        if (result) {
                                                            res.status(200).send('Done')
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        res.status(405).send('Please pay minimum of ' + bill)
                    }
                } else {
                    res.status(404).send('User not found')
                }
            }
        })
    } else {
        helperModel.findOne(findUser, (error, result) => {
            if (error) {
                res.status(500).send(error)
            } else {
                if (result) {
                    const costOfService = result.mechanicCallTower.costOfService
                    const paidMoney = req.body.cashPaid
                    if (paidMoney < costOfService) {
                        res.status(405).send('Please pay ' + costOfService)
                    } else {
                        const setMechanicCallTower = {
                            $set: {
                                mechanicCallTower: null
                            }
                        }
                        helperModel.findOneAndUpdate(findUser, setMechanicCallTower, (error, result) => {
                            if (error) {
                                res.status(500).send(error)
                            } else {
                                const setRequestToNull = {
                                    $set: {
                                        request: null,
                                        freeStatus: true
                                    }
                                }
                                helperModel.findOneAndUpdate(findHelper, setRequestToNull, (error, result) => {
                                    if (error) {
                                        res.status(500).send(error)
                                    } else {
                                        res.status(200).send('Done')
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
    }










    // const mobileNumber = {
    //     mobileNumber: req.body.mobileNumber
    // }
    // const findHelper = {
    //     mobileNumber: req.body.helperDetails.mobileNumber,
    //     userRole: req.body.helperDetails.typeOfService
    // }
    // const setRequestInHelperDb = {
    //     $set: {
    //         request: null,
    //         freeStatus: true
    //     }
    // }
    // model.findOne(mobileNumber, (error, result) => {
    //     if (error) {
    //         res.status(500).send(error)
    //     }
    //     else {
    //         if (result) {
    //             const wallet = result.walletMoney
    //             const bill = req.body.bill
    //             if (wallet - bill < 0) {
    //                 res.status(405).send('Not enough balance')
    //             }
    //             else {
    //                 const newWalletBalance = wallet - bill
    //                 const setWalletValue = {
    //                     $set: {
    //                         walletMoney: newWalletBalance,
    //                         currentJob: null
    //                     }
    //                 }
    //                 model.findOneAndUpdate(mobileNumber, setWalletValue, (error, result) => {
    //                     if (error) {
    //                         res.status(500).send(error)
    //                     } else {
    //                         if (result) {
    //                             helperModel.findOneAndUpdate(findHelper, setRequestInHelperDb, (error, result) => {
    //                                 if (error) {
    //                                     res.status(500).send(error)
    //                                 } else {
    //                                     if (result) {
    //                                         res.status(200).send('Done')
    //                                     } else {
    //                                         res.sendStatus(500)
    //                                     }
    //                                 }
    //                             })
    //                         } else {
    //                             res.status(404).send('User not found')
    //                         }
    //                     }
    //                 })
    //             }
    //             // res.send(result.walletMoney + "")
    //         }
    //         else {
    //             res.status(404).send('User not found')
    //         }
    //     }
    // })
})

module.exports = PayWithCash