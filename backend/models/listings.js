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
  },
  createNewListing: async (listing) => {
    const insertQuery = 'INSERT INTO `listings` SET ?';
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(insertQuery, [listing]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  findListingById: async (id) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT * FROM `listings` WHERE `id`=?',[id]
        );
        connection.release();
        return results;

    } catch (error) {
        throw new Error(error);
    }
  },
  findListingOwnerById: async(id) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT `owner` FROM `listings` WHERE `id`=?',[id]
        );
        connection.release();
        return results;
    } catch (error) {
        throw new Error(error);
    }
  },
  findListingByOwner: async (owner) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT * FROM `listings` WHERE `owner`=?',[owner]
        );
        connection.release();
        return results;

    } catch (error) {
        throw new Error(error);
    }
  },
  findListingByName: async(name) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT * FROM `listings` WHERE name LIKE CONCAT("%", ?, "%")', [name]
        );
        connection.release();
        return results;

    } catch (error) {
        throw new Error(error);
    }
},
  findByListing: async (listing) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT * FROM `listings` WHERE name=? AND description=?', [listing.name, listing.description]
        );
        connection.release();
        return results;
        } catch (error) {
        throw new Error(error);
        }
    },
  updateListing: async(listing) => {
    const updateQuery = 'UPDATE `listings` SET `name`=?, `price`=?, `description`=?, `image`=? WHERE `id`=?';
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(updateQuery, [listing.name, listing.price, listing.description, listing.image, listing.id]);
        connection.release();
        return results;
      } catch (error) {
      throw new Error(error);
      }
    },
    deleteListingById: async(id) => {
      const deleteQuery = 'DELETE FROM `listings` WHERE id=?';
      try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(deleteQuery, [id]);
        connection.release();
        return results;
      } catch (error) {
      throw new Error(error);
      }
    }
}

module.exports = listings;