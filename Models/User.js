const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ // Each user will have the following fields:
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
    avatar:{ // using gravater we can attach a profile image to our email
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);