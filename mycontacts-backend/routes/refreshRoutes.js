const express = require('express');
const router = express.Router();
const validateRefreshToken = require('../middleware/validateRefreshToken');

router.post('/', validateRefreshToken);

module.exports = router;