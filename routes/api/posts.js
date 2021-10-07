const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../Middleware/auth');

const User = require('../../Models/User');
const Post = require('../../Models/Post');
const Profile = require('../../Models/Profile');
const { reset } = require('nodemon');

// @ROUTE   POST api/posts
// @DESC    CREATE Post
// @ACCESS  Private 
router.post('/', [ auth, 
    [
    check('text', 'Text is required').not().isEmpty()
  ]
], async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){ // Brad said that it's a little redundant BUT this is what the docs say
        return res.status(400).json({ erros: errors.array() });
    };

    try {
        const user = await User.findById(req.user.id).select('-password'); 
        // ABOVE everything BUT the password => we dont need that

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avater: user.avater,
            user: req.user.id,
        })
    
        const post = await newPost.save();

        res.json(post);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @ROUTE   GET api/posts
// @DESC    Get all posts
// @ACCESS  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }) // -1 will show most recent post created! 
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @ROUTE   GET api/posts/:id
// @DESC    Get post by ID
// @ACCESS  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: 'Post not found!' });
        };

        res.json(post);
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found! Not a vailid ID' });
        };
        
        res.status(500).send('Server Error');
    }
})

// @ROUTE   DELETE api/posts/:id
// @DESC    DELETE a post
// @ACCESS  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: 'Post not found' });
        };

        //check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized' });
        };
        await post.remove();

        res.json({ msg: 'Post TERMINATED' });
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found! Not a vailid ID' });
        };
        res.status(500).send('Server Error');
    }
});


// @ROUTE   PUT api/posts/like/:id
// @DESC    Like a post
// @ACCESS  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ){
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });

        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @ROUTE   PUT api/posts/unlike/:id
// @DESC    Unlike a post
// @ACCESS  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ){
            return res.status(400).json({ msg: 'Post has not been liked yet' });
        };

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();
        
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @ROUTE   POST api/posts/comment/:id
// @DESC    Coment on a Post
// @ACCESS  Private 
router.post('/comment/:id', [ auth, 
    [
    check('text', 'Text is required').not().isEmpty()
  ]
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ // Brad said that it's a little redundant BUT this is what the docs say
        return res.status(400).json({ erros: errors.array() });
    };
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        const post = await Post.findById(req.params.id);

        const newComment = new Post({
            text: req.body.text,
            name: user.name,
            avater: user.avater,
            user: req.user.id,
        });

        post.comments.unshift(newComment);
    
        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;