const express = require('express');
const { getAllListings, createNewListing, updateListingById, deleteListing } = require('../controllers/listings');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', getAllListings);

router.use(verifyToken);

router.post('/', createNewListing);
router.put('/', updateListingById);
router.delete('/:id', deleteListing);

module.exports = router;