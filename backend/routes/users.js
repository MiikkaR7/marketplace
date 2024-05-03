const express = require('express');
const { loginUser, signUpUser, getIdByEmail } = require('../controllers/users');

const router = express.Router();

router.get('/user/:user', getIdByEmail);
router.post('/signup', signUpUser);
router.post('/login', loginUser);

module.exports = router;