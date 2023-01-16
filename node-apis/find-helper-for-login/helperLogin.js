const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = express()
const schema = require('../schema/schema')
const model = mongoose.model('findHelperModel', schema.findHelperSchema, 'helpers')

const FindHelperForLogin = app.post('/', (req, res) => {
    console.log(req.body)
    const mobileNumber = {
        mobileNumber: req.body.mobileNumber,
        userRole: req.body.userRole
    }
    model.findOne(mobileNumber, (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            if (result) {
                const stringObject = JSON.stringify(result)
                const parsedResultObject = JSON.parse(stringObject)
                if (parsedResultObject.userRole == req.body.userRole) {
                    if (bcrypt.compareSync(req.body.password, parsedResultObject.password)) {
                        res.send(result)
                    }
                    else {
                        res.status(401).send('Wrong Password')
                    }
                }
                else {
                    res.status(404).send('No user registered with number: ' + req.body.mobileNumber + ' & service: ' + req.body.userRole)
                }

            }
            else {
                res.status(404).send('User Not Found')
            }
        }
    })
})

module.exports = FindHelperForLogin