const express = require('express')
const mongoose = require('mongoose')
const app = express()
const schema = require('../schema/schema')

const model = mongoose.model('helperSchema', schema.helperSchema, 'helpers')
const reviewModel = mongoose.model('addUserReviewSchema', schema.userReviewSchema, 'helpers')



const AddUserReviewToHelper = app.post('/', (req, res) => {
    console.log(req.body)

    const reviewRecord = new reviewModel({
        userName: req.body.userName,
        reviewDetails: req.body.reviewDetails,
        reviewDate: req.body.reviewDate,
        reviewStar: req.body.reviewStar,
        userRole: req.body.userRole
    })
    const findUser = {
        mobileNumber: req.body.helperMobileNumber,
        userRole: req.body.userRole
    }
    model.findOne(findUser, (error, result) => {
        if (error) {
            res.status(500).send(error)
        } else {
            if (result) {
                const reviews = result.userReviews
                // console.log(reviews)
                let reviewStars = 0
                reviews.map(item => {
                    reviewStars = reviewStars + item.reviewStar
                })
                reviewStars = reviewStars + reviewRecord.reviewStar
                const totalReviews = reviews.length + 1
                const average = reviewStars / totalReviews
                console.log(average)
                const setItems = {
                    $push: {
                        userReviews: reviewRecord
                    },
                    $set: {
                        averageReview: average
                    }
                }
                model.findOneAndUpdate(findUser, setItems, (error, result) => {
                    if (error) {
                        res.send(error)
                    }
                    else {
                        if (result) {
                            res.status(200).send('Done')
                        } else {
                            res.status(404).send('User not found')
                        }
                    }
                })
            } else {
                res.status(404).send('User not found')
            }
        }
    })


})

module.exports = AddUserReviewToHelper