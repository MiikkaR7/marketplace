const pool = require('../db/pool');
const listings = {
  findAllListings: async() => {
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(
        'SELECT * FROM `listings`'
      );
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = listings;