const pool = require('../db/pool');
const users = {
  findAllUsers: async() => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(
            'SELECT name, email FROM `users`'
        );
        connection.release();
        return results;

    }   catch (error) {
        throw new Error(error);
    }
},
  create: async (user) => {
    try {
      const insertQuery = 'INSERT INTO `users` SET ?';
      const connection = await pool.getConnection();
      const [results] = await connection.query(insertQuery, [user]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  findByEmail: async (email) => {
    try {
      const selectQuery = 'SELECT * FROM `users` WHERE email=?';
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [email]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  findIdByEmail: async (email) => {
    try {
      const selectQuery = 'SELECT `id` FROM `users` WHERE email=?';
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [email]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
};
module.exports = users;