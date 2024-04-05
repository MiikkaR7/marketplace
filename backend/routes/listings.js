const express = require('express');
const { getAllListings } = require('../controllers/listings');

const router = express.Router();



router.get('/', getAllListings);

module.exports = router;