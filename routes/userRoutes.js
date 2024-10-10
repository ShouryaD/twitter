const express = require('express');
const { registerUser, loginUser, deleteUser, updateUser } = require('../controller/userController');
const verifyToken = require('../middleware/checkToken');
const multerConfig = require('../multerConfig')
const router = express.Router()

router.post('/register',multerConfig.single('profilePic'), registerUser)
router.post('/login', loginUser)
router.delete('/delete/:_id', verifyToken, deleteUser)
router.put('/update/:_id', verifyToken, updateUser)

module.exports = router