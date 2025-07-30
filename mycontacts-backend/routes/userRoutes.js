const express = require('express');
const {registerUser, loginUser, currentUser, logoutUser} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const validateRefreshToken = require('../middleware/validateRefreshToken');
const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post(logoutUser);

router.route('/current').get(validateToken, currentUser);

module.exports = router;