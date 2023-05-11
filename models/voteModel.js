const { getConnection } = require("../db/db");

const voteModel = {};
voteModel.create = async (linkId, userId) => {
  const connection = await getConnection();
  const sql = `INSERT INTO votes (userId, linkId) VALUES (?, ?)`;
  await connection.query(sql, [userId, linkId]);
};

voteModel.findByLinkIdAndUserId = async (linkId, userId) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM votes WHERE linkId = ? AND userId = ?`;
  const [rows] = await connection.query(sql, [linkId, userId]);
  return rows.length ? rows[0] : null;
};

voteModel.delete = async (voteId) => {
  const connection = await getConnection();
  const sql = `DELETE FROM votes WHERE id = ?`;
  await connection.query(sql, [voteId]);
};

module.exports = voteModel;
