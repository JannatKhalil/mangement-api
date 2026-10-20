const pool = require('../config/db');

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) AS total_tasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_tasks,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_tasks,
        COUNT(CASE WHEN status = 'in-progress' THEN 1 END) AS in_progress_tasks,
        COUNT(CASE WHEN due_date < CURRENT_DATE AND status != 'completed' THEN 1 END) AS overdue_tasks
      FROM tasks
    `);

    res.json(stats.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};