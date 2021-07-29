const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');

const Profile = require('../../Models/Profile');
const User = require('../../Models/User');

// @route   GET api/profile/me
// @desc    Get Current Users Profile
// @access  Private

router.get('/me', auth, async (req,res) => {

    try{
        // the user: passing thru is going to pertain to our profile model user field => ProfileSchema userID
        // populate with the name of the user and the avatar => from the user model
        const profile = await Profile.findOne({ user: req.user.id }).populate( //   populate from 'USER'
            'user', 
            ['name', 'avatar'] // array of fields that we want to bring in from user
        ); 

        if(!profile){ // if there ISN'T a profile
            return res
            .status(400)
            .json({ msg: 'Sorry but here is no profile for this user - MAI GAI' })
        }

        res.json(profile); // if there is a profile we want to see it!

    }catch(err){
        console.error(err.message);
        res
        .status(500)
        .send('SERVER ERROR - yo git good foo');
    }

});


module.exports = router;