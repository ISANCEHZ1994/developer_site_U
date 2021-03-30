const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Test Route
// @access  Public => if you need a token to access a SPECIFC route 
// ex: to add profile you need to be authenticated => send a token to that route
router.get('/', (req,res) => res.send('user route'));

module.exports = router;