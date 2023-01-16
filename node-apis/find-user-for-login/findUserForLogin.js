const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('findUserModel', schema.findUserSchema, 'users')

const FindUserForLogin = app.post('/', (req, res) => {
    const mobileNumber = {
        mobileNumber: req.body.mobileNumber
    }
    model.findOne(mobileNumber, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                const stringObject = JSON.stringify(result)
                const parsedResultObject = JSON.parse(stringObject)
                if (bcrypt.compareSync(req.body.password, parsedResultObject.password)) {
                    res.send(result)
                }
                else {
                    res.status(401).send('Wrong Password')
                }
            }
            else {
                res.status(404).send('User Not Found')
            }
        }
    })
})

module.exports = FindUserForLogin