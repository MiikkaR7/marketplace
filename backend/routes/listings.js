const express = require('express');
const { getAllListings, createNewListing } = require('../controllers/listings');

const router = express.Router();

router.get('/', getAllListings);
router.post('/', createNewListing)

module.exports = router;