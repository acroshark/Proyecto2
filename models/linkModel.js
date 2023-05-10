const { getConnection } = require("../db/db");
const linkModel = {};
linkModel.create = async (userId, url, title, description) => {
  const connection =await getConnection()
  const sql = `INSERT INTO links (userId, url, title, description) VALUES (?, ?, ?, ?)`;
  await connection.query(sql, [userId, url, title, description]);
};
linkModel.findById = async (id) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM links WHERE id = ?`;
  await connection.query(sql, [id]);
};
module.exports = linkModel;