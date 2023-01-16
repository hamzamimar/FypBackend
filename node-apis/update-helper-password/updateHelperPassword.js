const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bcrypt = require('bcrypt')
const schema = require('../schema/schema')
const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')

const UpdateHelperPassword = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)
    const setPassword = {
        password: hashedPassword
    }
    model.findOneAndUpdate(findUser, setPassword, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                res.status(200).send('Done')
            } else {
                res.status(404).send('User not found')
            }
        }
    })
})

module.exports = UpdateHelperPassword