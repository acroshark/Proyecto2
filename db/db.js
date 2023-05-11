require("dotenv").config();

const mysql = require("mysql2/promise");

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
      timezone: "local",
    });
  }

  return await pool.getConnection();
}

module.exports = {
  getConnection,
};
