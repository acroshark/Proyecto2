const { getConnection } = require("../db/db");
const voteModel = {};
voteModel.create = async (linkId, userId) => {
  const connection = await getConnection();
  const sql = `INSERT INTO votes (userId, linkId) VALUES (?, ?)`;
  await connection.query(sql, [userId, linkId]);
  connection.release();
};
voteModel.findByLinkIdAndUserId = async (linkId, userId) => {
  const connection = await getConnection();
  const sql = `SELECT * FROM votes WHERE linkId = ? AND userId = ?`;
  const [rows] = await connection.query(sql, [linkId, userId]);
  connection.release();
  return rows.length ? rows[0] : null;
};
voteModel.delete = async (voteId, userId) => {
  const connection = await getConnection();
  const sql = `DELETE FROM votes WHERE id = ? AND userId = ?`;
  await connection.query(sql, [voteId, userId]);
  connection.release();
};
voteModel.deleteByLinkId = async (linkId) => {
  const connection = await getConnection();
  const sql = `DELETE FROM votes WHERE linkId = ?`;
  await connection.query(sql, [linkId]);
  connection.release();
};
voteModel.updateVoteCount = async (linkId) => {
  const connection = await getConnection();
  const sql = `
    UPDATE votes
    SET voteCount = (
      SELECT voteCount FROM (
        SELECT COUNT(*) AS voteCount FROM votes WHERE linkId = ?
      ) AS subquery
    )
    WHERE linkId = ?
  `;
  await connection.query(sql, [linkId, linkId]);
  connection.release();
};
module.exports = voteModel;

