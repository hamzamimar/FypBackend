const mongoose = require('mongoose')

const appUsageDetailsSchema = mongoose.Schema({
    serviceDate: Date,
    serviceType: String,
    costOfService: Number,
    location: {
        latitude: String,
        longitude: String
    },
    serviceNotesDetails: String,
    userRate: Number,
})

const vehicleSchema = mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    engineCc: Number,
    transmission: String,
    mileage: Number
})

const serviceRecordSchema = mongoose.Schema({
    serviceDate: Date,
    serviceType: String,
    costOfService: Number,
    currentMileage: Number,
    serviceNotesDetails: String,
    nextServiceDate: Date
})

const usageHistorySchema = mongoose.Schema({
    usageDate: Date,
    costOfService: Number,
    userLocation: {
        longitude: Number,
        latitude: Number
    },
    helperLocation: {
        longitude: Number,
        latitude: Number
    },
    helperDetails: {
        cnic: String,
        fullName: String,
        mobileNumber: String,
        typeOfService: String
    },
})

const mechanicNotesSchema = mongoose.Schema({
    noteTitle: String,
    carDetail: String,
    noteContent: String,
    noteDate: Date
})

const userReviewSchema = mongoose.Schema({
    userName: String,
    reviewDetails: String,
    reviewDate: Date,
    reviewStar: Number,
    helperMobileNumber: String,
    userRole: String
})

const userRequestSchema = mongoose.Schema({
    requestSender: {
        cnic: String,
        fullName: String,
        mobileNumber: String,
        email: String,
        gender: String,
        userRole: String,
        lastLocation: {
            longitude: Number,
            latitude: Number
        },
    },
    requestReceiver: {
        cnic: String,
        fullName: String,
        mobileNumber: String,
        email: String,
        gender: String,
        userRole: String,
        location: {
            longitude: Number,
            latitude: Number
        },
    },
    reqestAcceptanceStatus: Boolean
})

const helperSchema = mongoose.Schema({
    cnic: String,
    fullName: String,
    mobileNumber: String,
    email: String,
    gender: String,
    dateOfBirth: Date,
    password: String,
    userRole: String,
    session: String,
    location: {
        longitude: Number,
        latitude: Number
    },
    mechanicNotes: [mechanicNotesSchema],
    userReviews: [userReviewSchema],
    averageReview: Number,
    request: userRequestSchema,
    activeStatus: Boolean,
    freeStatus: Boolean,
    experience: Number,
    mechanicCallTower: usageHistorySchema,
    skills:[]
})

const userSchema = mongoose.Schema({
    cnic: String,
    fullName: String,
    mobileNumber: String,
    email: String,
    gender: String,
    dateOfBirth: Date,
    password: String,
    userRole: String,
    session: String,
    lastLocation: {
        longitude: Number,
        latitude: Number
    },
    appUsageRecords: [appUsageDetailsSchema],
    vehicleInformation: vehicleSchema,
    vehicleServiceRecords: [serviceRecordSchema],
    usageHistory: [usageHistorySchema],
    currentJob: usageHistorySchema,
    walletMoney: Number
})

const findUserSchema = mongoose.Schema({
    mobileNumber: String,
    password: String
})

const findHelperSchema = mongoose.Schema({
    mobileNumber: String,
    password: String,
    userRole: String
})

module.exports = {
    appUsageDetailsSchema,
    vehicleSchema,
    serviceRecordSchema,
    userSchema,
    findUserSchema,
    usageHistorySchema,
    helperSchema,
    findHelperSchema,
    userReviewSchema,
    mechanicNotesSchema,
    userRequestSchema
}