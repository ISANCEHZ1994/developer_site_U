const  jwt = require('jsonwebtoken');
const config = require('config');
// BELOW IS OUR CUSTOM MIDDLEWARE

module.exports = function(req, res, next){

    // Get Token from header
    const token = req.header('x-auth-token');

    // Check if not Token
    if(!token) {
        return res.status(401).json({ msg: 'No Token, Authorization DENIED' });
    }

    // Verify Token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user; // this the decoded object
        next();

    } catch(err){
        res.status(401).json({ msg: 'Token is not vaild' });
    }

};