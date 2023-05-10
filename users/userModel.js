const { getConnection } = require("../db/db");
const userModel = {};
userModel.create = async (name, email, password) => {
  const connection = await getConnection();
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  await connection.query(sql, [name, email, password]);
};
userModel.findByEmail = async (email) => {
  console.log("user");
  const connection = await getConnection();
  const sql = `SELECT * FROM users WHERE email = ?`;
  let result = await connection.query(sql, [email]);
  return result;
};
userModel.findById = async (id) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM users WHERE id = ?`;
  await connection.query(sql, [id]);
};
module.exports = userModel;