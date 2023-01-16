const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('insertHelperModel', schema.helperSchema, 'helpers')

const SetHelper = app.post('/', (req, res) => {
    const session = bcrypt.hashSync(Math.floor(Math.random() * 1000).toString(), 12)
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const helper = new model({
        cnic: req.body.cnic,
        fullName: req.body.fullName,
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        userRole: req.body.userRole,
        session: session,
        dateOfBirth: req.body.dateOfBirth,
        password: hashedPassword,
        location: req.body.lastLocation,
        userReviews: [],
        mechanicNotes: [],
        request: null,
        activeStatus: true,
        freeStatus: true,
        experience: req.body.experience,
        skills: req.body.skills
    })
    helper.save((error, model) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            res.status(200).send(helper)
        }
    })
})

module.exports = SetHelper