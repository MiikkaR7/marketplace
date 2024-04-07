const express = require('express');
const { getAllListings, createNewListing, updateListingById } = require('../controllers/listings');

const router = express.Router();

router.get('/', getAllListings);
router.post('/', createNewListing);
router.put('/', updateListingById);

module.exports = router;