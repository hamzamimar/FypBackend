const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bcrypt = require('bcrypt')
const schema = require('../schema/schema')
const model = mongoose.model('userSchema', schema.userSchema, 'users')

const UpdateUserPassword = app.post('/', (req, res) => {
    const findUser = {
        mobileNumber: req.body.mobileNumber
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

module.exports = UpdateUserPassword