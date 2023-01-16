const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('insertUserModel', schema.userSchema, 'users')

const SetUser = app.post('/', (req, res) => {
    const session = bcrypt.hashSync(Math.floor(Math.random() * 1000).toString(), 12)
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const user = new model({
        cnic: req.body.cnic,
        fullName: req.body.fullName,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        gender: req.body.gender,
        userRole: req.body.userRole,
        session: session,
        dateOfBirth: req.body.dateOfBirth,
        password: hashedPassword,
        vehicleInformation: req.body.vehicleInformation,
        walletMoney: 0,
        lastLocation: null,
        appUsageRecords: [],
        usageHistory: []
    })
    user.save((error, model) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).send(user)
        }
    })
})

module.exports = SetUser