const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../Models/User');

// @route   POST api/users
// @desc    Register User
// @access  Public => if you need a token to access a SPECIFC route 
// ex: to add profile you need to be authenticated => send a token to that route

router.post('/',[ // within the route we add another parameter - array of things to check for!
    check('name', 'NOTE: Name is required!') 
    // checking to make sure the name is there if not returns custom error message
    .not()  // not and isEmpty are requried when using check!
    .isEmpty(),

    check('email', "NOTE: Please include a valid email!")
    .isEmail(), // making sure the email is unique and valid

    check('password', "NOTE: Please enter a password with 6 or more characters!")
    .isLength({ min: 6 }), // making sure the password is longer than 6

], async (req,res) => {
    const errors = validationResult(req);
    // we want our custom error messages to appear when its checking for something 
    if(!errors.isEmpty()){// if there ARE errors we want a response!
        return res.status(400).json({ errors: errors.array() }); 
    }
    // Destructor so that we don't always call it again and again
    const { name, email, password } = req.body;

     try {
        // See if user exists in this case by email
        let user = await User.findOne({ email }); 
        if(user){
           return res.status(400).json({ errors: [{mgs: "User already exisits! - no stealing"}] });
        };

        // get users gravater
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({ // creates new instance but does not SAVE the 'new' user
            name, 
            email,
            avatar,
            password
        })

        // encrypt password
        const salt = await bcrypt.genSalt(10); // this is for security - the more you have the slower it can be
        user.password = await bcrypt.hash(password, salt); // now we are saying we want to encrypt the password
        await user.save();

        // return jsonwebtoken  
        res.send('user registered! => we confirmed that order cheif'); 
     } catch (error) {

        console.error(error);
        res.status(500).send("SERVER ERROR");
         
     }; // ends try block here!
});

module.exports = router;