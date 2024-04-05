import mysql from 'mysql2/promise';

async function queryDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'listings_db',
    password: 'listingspw'
  });
}

queryDatabase();