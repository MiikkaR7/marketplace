const express = require('express');
const { getAllListings, createNewListing, updateListingById, deleteListing, getListingById, getListingsbyOwner, getListingsByName, getListingOwnerById } = require('../controllers/listings');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.get('/owner/:id', getListingOwnerById);
router.get('/search/:name', getListingsByName);

router.use(verifyToken);

router.get('/mylistings/:owner', getListingsbyOwner);
router.post('/', createNewListing);
router.put('/', updateListingById);
router.delete('/:email/:id', deleteListing);

module.exports = router;