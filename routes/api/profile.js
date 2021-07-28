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
        // the user: passing thru is going to pertain to our profile model user field
        // populate with the name of the user and the avatar => from the user model
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        ); 

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('SERVER ERROR - yo git good foo');
    }

});



module.exports = router;