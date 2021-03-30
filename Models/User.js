const mongoose = require('mongoose');

// Each user will have the following fields:
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);