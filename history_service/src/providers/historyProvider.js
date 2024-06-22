const pool = require('../db/pool');

const getHistory = async (userId, limit, offset) => {
  const query = `
    SELECT * FROM history
    WHERE ($1::int IS NULL OR user_id = $1)
    ORDER BY timestamp DESC
    LIMIT $2 OFFSET $3
  `;
  const values = [userId ? parseInt(userId, 10) : null, parseInt(limit, 10), offset];
  const result = await pool.query(query, values);
  return result.rows;
};

const getTotalRecords = async (userId) => {
  const query = `
    SELECT COUNT(*) FROM history
    WHERE ($1::int IS NULL OR user_id = $1)
  `;
  const values = [userId ? parseInt(userId, 10) : null];
  const result = await pool.query(query, values);
  return parseInt(result.rows[0].count, 10);
};

const addHistoryEvent = async (action, userId, timestamp) => {
  const query = `
    INSERT INTO history (action, user_id, timestamp) 
    VALUES ($1, $2, $3) 
    RETURNING *
  `;
  const values = [action, userId, timestamp];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  getHistory,
  getTotalRecords,
  addHistoryEvent,
};
