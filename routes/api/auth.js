const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../Middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../Models/User');

// @route   GET api/auth
// @desc    Test Route
// @access  Public 
router.get('/', auth, async (req,res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }   catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    };
 
});

// NOTE: below is taken from users.js (from routes folder)

// @route   POST api/users
// @desc    Authenticate User & Get Token
// @access  Public

router.post('/',[
    check('email', "NOTE: Please include a valid email!").isEmail(), 
    check('password', "NOTE: Password is required!").exists() 
], 
    async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){  
        return res.status(400).json({ errors: errors.array() }); 
    }
    
    const { email, password } = req.body;

     try {
        let user = await User.findOne({ email }); 

        if(!user){ // now we are checking if there ISN'T a user
           return res
           .status(400)
           .json({ errors: [{mgs: "INVALID CREDENTIALS"}] });
        };

        // *** No point to use avatar here!! ***
        // *** We create users inside the User file (routes) ***

        // first argument => takes in plaintext password the user enters
        // second argument => takes in the encrypted password that we also get from the user
        const isMatch = await bcrypt.compare( password, user.password ); 

        if(!isMatch){
            return res
           .status(400)
           .json({ errors: [{mgs: "INVALID CREDENTIALS"}] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,    
            config.get('jwtSecret'), 
            { expiresIn: 360000 }, 
            (err, token) => {     
               if (err) throw err; 
               res.json({ token }); 
            }
        );

     } catch (error) {
        console.error(error);
        res.status(500).send("SERVER ERROR - perhaps you done goofed?");
     }; // ends try block here!
}); // router.post ends here!



module.exports = router;