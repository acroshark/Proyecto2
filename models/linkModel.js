const { getConnection } = require('../db/db');
const linkModel = {};
linkModel.create = async (userId, url, title, description) => {
  console.log(userId, url, title, description);
  const connection = await getConnection();
  const sql = `INSERT INTO links (userId, url, title, description) VALUES (?, ?, ?, ?)`;
  let [result] = await connection.query(sql, [userId, url, title, description]);
  return result;
};
linkModel.findById = async (id) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM links WHERE id = ?`;
  let [result] = await connection.query(sql, [id]);
  return result;
};
linkModel.find = async (date) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM links WHERE convert(createdAt,date) = ?`;
  let [result] = await connection.query(sql, [date]);
  return result;
};
linkModel.delete = async (id) => {
  const connection = await getConnection();
  const sql = `DELETE  FROM links WHERE id = ?`;
  let result = await connection.query(sql, [id]);
  return result;
};
module.exports = linkModel;
