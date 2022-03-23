const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../Middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../Models/Profile');
const Post = require('../../Models/Post');
const User = require('../../Models/User');

// NOTE: when ACCESSS is Private: we will be using middleware: auth!

// @ROUTE   GET api/profile/me
// @DESC    Get Current Users Profile
// @ACCESS  Private
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
        };
        res.json(profile); // if there is a profile we want to see it!
    } catch (err) {
        console.error(err.message);
        res.status(500)
           .send('SERVER ERROR - yo git good foo');
    };
});

// @ROUTE   POST api/profile
// @DESC    Create or Update a User Profile
// @ACCESS  Private

// we need to use the validation middleware hence the brackets/array inside of array!
router.post('/', [auth, [
     check('status', 'Status is required').not().isEmpty(),
     check('skills', 'Skills is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ 
            errors: errors.array() 
        });
    };

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
    profileFields.user = req.user.id; // this will go to Profile MODEL and use USER.id

    // check to see if the information is actually coming in before we set it
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(portfolio) profileFields.portfolio = portfolio;
    if(skills){
        profileFields.skills = skills.split(',').map( skill => skill.trim() );
    };

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

// @ROUTE   GET  api/profile
// @DESC    Get ALL profiles
// @ACCESS  Public
router.get('/', async (req, res) => {
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error!! Trying to get all profiles route...');        
    }
});

// @ROUTE   GET  api/profile/user/:user_id
// @DESC    Get Profile by ID
// @ACCESS  Public
router.get('/user/:user_id', async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.params.user_id })
                                     .populate('user', ['name', 'avatar']);
        if(!profile) 
        return res.status(400)
                  .json({ msg: 'Profile not found! => This is a vaild ID BUT there is no user for THIS ID' });

        res.json(profile);

    }catch(err){
        console.error(err.message);

        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: 'Profile not found!' });
        }
        res.status(500).send('Server Error => perhaps the user ID is wrong?')
    }
});


// @ROUTE   DELETE  api/profile
// @DESC    DELETE a Specifc profile, user & posts
// @ACCESS  Private
router.delete('/', auth, async (req, res) => {
    try{
        // remove user posts
        await Post.deleteMany({ user: req.user.id });

        // remove profile 
        await Profile.findOneAndRemove({ user: req.user.id });

        // remove user
        await User.findOneAndRemove({ _id: req.user.id }); 
        // NOTE: above we used the user: field when we .findOneaAndRemove() 
        // changed to _id: because it is not a field in the USER model

        res.json({ mgs: 'User/Profile: TERMINATED' });

    }catch(err){

        console.error(err.message);
        res.status(500).send('server error!! Maybe something is wrong with the delete route?');
        
    }
});

// @ROUTE   PUT  api/profile/experience
// @DESC    Add Profile Experience
// @ACCESS  Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty()
    ]
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    };

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

  }
);

// @ROUTE   DELETE  api/profile/experience/:exp_id
// @DESC    DELETE Profile Experience
// @ACCESS  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get Remove Index => variable will find the specific index in the array to remove
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        // console.log(profile, 'this is the profile object')
        // console.log(profile.experience, 'this is the experience array')
        // actually removing the found index/experience
        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @ROUTE   PUT  api/profile/education
// @DESC    Add Profile Education
// @ACCESS  Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
    ]
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    };

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

  }
);

// @ROUTE   DELETE  api/profile/education/:edu_id
// @DESC    DELETE Profile education
// @ACCESS  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get Remove Index => variable will find the specific index in the array to remove
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        // console.log(profile, 'this is the profile object')
        // console.log(profile.experience, 'this is the experience array')
        // actually removing the found index/experience
        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @ROUTE   GET  api/profile/github/:username
// @DESC    GET User Repo from Github
// @ACCESS  Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5
                &sort=created:asc
                &client_id=${config.get('githubClientId')}
                &client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        
        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode != 200){
                res.status(404).json({ msg: 'No GitHub profile found: Invaild GitHub username' });
            }

            res.json(JSON.parse(body));
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    };
});


module.exports = router;