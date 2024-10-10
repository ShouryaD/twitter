const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    userName: {
        type: String,
        // required: [true, 'Username is required'],
        // unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    profilePic: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    address:{
        type:String,
        required:true
    }
}, { timestamps: true })

module.exports = mongoose.model('user', UserSchema)