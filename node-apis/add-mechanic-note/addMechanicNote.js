const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')
const noteSchema = mongoose.model('addNoteSchema', schema.mechanicNotesSchema, 'helpers')

const AddMechanicNote = app.post('/', (req, res) => {
    const mechanicNote = new noteSchema({
        noteTitle: req.body.noteTitle,
        carDetail: req.body.carDetail,
        noteContent: req.body.noteContent,
        noteDate: req.body.noteDate
    })
    const findUser = {
        mobileNumber: req.body.helperMobileNumber,
        userRole: req.body.userRole
    }
    const pushItemInArray = {
        $push: {
            mechanicNotes: mechanicNote
        }
    }
    model.findOneAndUpdate(findUser, pushItemInArray, (error, result) => {
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
})

module.exports = AddMechanicNote