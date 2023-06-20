require('dotenv').config();
const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
let pool;
//Get connection from pool
async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      timezone: 'local',
    });
  }
  return await pool.getConnection();
}
module.exports = {
  getConnection,
};

require('dotenv').config();
const { getConnection } = require('./db');
async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS votes');
    await connection.query('DROP TABLE IF EXISTS links');
    await connection.query('DROP TABLE IF EXISTS users');
    console.log('Creando tablas');
    await connection.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        token VARCHAR(255) DEFAULT NULL  -- Agregar la columna 'token'
      );
    `);
    await connection.query(`
      CREATE TABLE links (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);
    await connection.query(`
      CREATE TABLE votes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        linkId INT NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        voteCount INT NOT NULL DEFAULT 0, -- Columna para contar los votos
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (linkId) REFERENCES links(id)
      );
    `);
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
main();
