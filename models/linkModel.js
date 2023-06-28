const { getConnection } = require("../db/db");
const linkModel = {};
linkModel.create = async (userId, url, title, description) => {
  console.log(userId, url, title, description);
  const connection = await getConnection();
  const sql = `INSERT INTO links (userId, url, title, description) VALUES (?, ?, ?, ?)`;
  let [result] = await connection.query(sql, [userId, url, title, description]);
  connection.release();
  return result;
};
linkModel.findById = async (id) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM links WHERE id = ?`;
  let [result] = await connection.query(sql, [id]);
  connection.release();
  return result;
};
linkModel.find = async (date, userId) => {
  const connection = await getConnection();
  const sql = "SELECT links.id, links.userId, links.url, links.title, links.description, links.createdAt, count(v.id) as votes, count(uv.id) as liked FROM links left join votes v on links.id = v.linkId left join (SELECT * FROM votes WHERE userId=?) uv on links.id=uv.linkId WHERE convert(links.createdAt,date) = ? group by links.id order by createdAt desc";
  let [result] = await connection.query(sql, [userId,date]);
  connection.release();
  return result;
};
linkModel.delete = async (id) => {
  const connection = await getConnection();
  const sql = `DELETE  FROM links WHERE id = ? `;
  let result = await connection.query(sql, [id]);
  connection.release();
  return result;
};
linkModel.deleteByUserId = async (userId) => {
  const connection = await getConnection();
  const sql = `DELETE FROM links WHERE userId = ?`;
  let result = await connection.query(sql, [userId]);
  connection.release();
  return result;
};
module.exports = linkModel;










