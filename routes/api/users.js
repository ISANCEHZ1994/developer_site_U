const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator') ;

// @route   POST api/users
// @desc    Register User
// @access  Public => if you need a token to access a SPECIFC route 
// ex: to add profile you need to be authenticated => send a token to that route

const User = require('../../Models/User');

router.post('/',[ // within the route we add another parameter - array of things to check for!
    check('name', 'NOTE: Name is required!') // checking to make sure the name is there returns custom error message
        .not() 
        .isEmpty(),
    check('email', "NOTE: Please include a valid email!")
        .isEmail(), // making sure the email is unique
    check('password', "NOTE: Please enter a password with 6 or more characters!")
        .isLength({ min: 6 }), // making sure the password is longer than 6
], async (req,res) => {

    const errors = validationResult(req);
    // we want our custom error messages to appear when its checking for something 
    if( !errors.isEmpty() ){
        // 400 means bad request! // .json because we want the messages to show up!
        return res.status(400).json({ errors: errors.array() }); 
    };
    const { name, email, password } = req.body;
    try{
    // see if user exisits
    let user = await User.findOne({ email }); // whatever we want to search by in this case by email!

    if( user ){
        return res
               .status( 400 )
               .json({ errors: [{ msg: 'That User Already Exists!' }] });
    };

    // get users gravater
    const avatar = gravatar.url( email,{
        s: '200',
        r: 'pg',
        d: 'mm'
    });

    user = new User({
        name,
        email,
        avatar,
        password
    });

    //encrypt password
    const salt = await bcrypt.genSalt( 10 ); // the more you have the more secure however it will be slower!
    user.password = await bcrypt.hash( password,salt );
    await user.save();
    const payload = {
        user: {
            id: user.id
        }
    };
    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        ( err, token ) => {
            if(err) throw err;
            res.json({ token });
        }
    );
    // return jsonwebtoken
    // res.send('User Route');
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error!')
    }; 
});

module.exports = router;
