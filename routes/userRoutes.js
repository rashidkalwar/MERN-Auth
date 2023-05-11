const express = require('express');
const bodyParser = require('body-parser');
const { register, login } = require('../controllers/userController');

const router = express.Router();

router.post('/register', bodyParser.json(), register);
router.post('/login', bodyParser.json(), login);

module.exports = router;
