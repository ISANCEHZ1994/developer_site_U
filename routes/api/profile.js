const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../Models/Profile');
const User = require('../../Models/User');

// @route   GET api/profile/me
// @desc    Get Current Users Profile
// @access  Private

router.get('/me', auth, async (req, res) => {
    try {
        // the user: passing thru is going to pertain to our profile model user field => ProfileSchema userID
        // populate with the name of the user and the avatar => from the user model
        const profile = await Profile.findOne({ user: req.user.id }).populate( //   populate from 'USER'
            'user',
            ['name', 'avatar'] // array of fields that we want to bring in from user
        );

        if (!profile) { // if there ISN'T a profile
            return res.status(400)
                      .json({ msg: 'Sorry but here is no profile for this user - MAI GAI' })
        }

        res.json(profile); // if there is a profile we want to see it!

    } catch (err) {
        console.error(err.message);
        res.status(500)
           .send('SERVER ERROR - yo git good foo');
    }

});

// @route   POST api/profile
// @desc    Create or Update a Users Profile
// @access  Private

// we need to use the validation middleware hence the brackets!
router.post('/', [auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Skills is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400)
                  .json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,  
        githubusername,
        skills,
        portfolio,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build Profile Object
    const profileFields = {}; // object that will be inserted to the database
    profileFields.user = req.user.id;

    // check to see if the information is actually coming in before we set it
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(portfolio) profileFields.portfolio = portfolio;

    if(skills){
        profileFields.skills = skills.split(',').map( skill => skill.trim());
    }

    // Build Social Object
    profileFields.social = {}; 

    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    try{
        let profile = await Profile.findOne({ user: req.user.id  }); // look for a profile by userID
        
        if(profile){  // if FOUND

            //  UPDATE
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields }, // set the profile fields above
                { new: true }
            );

            return res.json(profile)
        };

        // CREATE if user NOT FOUND
        profile = new Profile(profileFields);   
        
        // SAVE
        await profile.save();
        res.json(profile);

    }catch(err){
        
        console.error(err.message);
        res.status(500)
           .send('Server Error');

    };
   
});

module.exports = router;