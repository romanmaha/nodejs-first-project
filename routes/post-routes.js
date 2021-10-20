const express = require('express');
const router = express.Router()
const {getPost, addPost, getEditPost, editPost, deletePost, getPosts, getAddPost}= require('../controllers/post-controller')
router.post('/add-post', addPost)
router.get('/add-post', getAddPost);
router.get('/posts/:id', getPost)
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.delete('/posts/:id', deletePost);
router.get('/posts', getPosts);
module.exports = router;