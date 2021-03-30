const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator') ;

// @route   POST api/users
// @desc    Register User
// @access  Public => if you need a token to access a SPECIFC route 
// ex: to add profile you need to be authenticated => send a token to that route

router.post('/',[ // within the route we add another parameter - array of things to check for!
    check('name', 'NOTE: Name is required!') // checking to make sure the name is there returns custom error message
    .not() 
    .isEmpty(),
    check('email', "NOTE: Please include a valid email!")
    .isEmail(), // making sure the email is unique
    check('password', "NOTE: Please enter a password with 6 or more characters!")
    .isLength({ min: 6 }), // making sure the password is longer than 6

], (req,res) => {
    const errors = validationResult(req);
    // we want our custom error messages to appear when its checking for something 
    if(!errors.isEmpty()){
        // 400 means bad request! // .json because we want the messages to show up!
        return res.status(400).json({ errors: errors.array() }); 
    }
    res.send('user route');
});

module.exports = router;