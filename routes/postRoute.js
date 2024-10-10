let express = require('express')
const { createPost, getAllPosts, getUserPosts } = require('../controller/postController')
let router = express.Router()

router.post('/create', createPost)
router.get('/getAll', getAllPosts)
router.get('/getUserPosts/:_id',getUserPosts)

module.exports = router