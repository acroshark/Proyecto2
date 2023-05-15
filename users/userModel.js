const { getConnection } = require("../db/db");
const userModel = {};
userModel.create = async (name, email, password) => {
  const connection = await getConnection();
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  let result = await connection.query(sql, [name, email, password]);
  connection.release();
  return result;
};
userModel.findByEmail = async (email) => {
  console.log("user");
  const connection = await getConnection();
  const sql = `SELECT * FROM users WHERE email = ?`;
  let result = await connection.query(sql, [email]);
  connection.release();
  return result;
};
userModel.findById = async (id) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM users WHERE id = ?`;
  let result = await connection.query(sql, [id]);
  connection.release();
  return result;
};

userModel.update = async (id, name, email, password) => {
  const connection = await getConnection();
  const sql = `UPDATE users SET name=?, email=?, password=? WHERE id=?`;
  let result = await connection.query(sql, [name, email, password, id]);
  connection.release();
  return result;
};

module.exports = userModel;
