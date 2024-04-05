const listings = require('../models/listings');

const getAllListings = async (req, res) => {
    try {
        const response = await listings.findAllListings();
        if (response) {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }

}


module.exports = {
    getAllListings
  };