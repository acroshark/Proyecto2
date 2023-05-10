const { getConnection } = require("../db/db");
const voteModel = {};
voteModel.create = async(userId, linkId) => {
  const connection = await getConnection();
  const sql = `INSERT INTO votes (userId, linkId) VALUES (?, ?)`;
  await connection.query(sql, [userId, linkId]);
};
module.exports = voteModel;