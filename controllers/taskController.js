const pool = require('../config/db');

// Get All Tasks (Filter, Search, Pagination, Sorting & JOIN)
exports.getTasks = async (req, res) => {
  try {
    let { page = 1, limit = 10, search, status, overdue, sortBy = 'created_at', order = 'DESC' } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    let query = `
      SELECT t.*, p.title as project_title, u.name as assigned_user 
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.assigned_user_id = u.id
      WHERE 1=1
    `;
    let values = [];

    // Search by Title/Description
    if (search) {
      values.push(`%${search}%`);
      query += ` AND (t.title ILIKE $${values.length} OR t.description ILIKE $${values.length})`;
    }

    // Filter by Status
    if (status) {
      values.push(status);
      query += ` AND t.status = $${values.length}`;
    }

    // Filter Overdue Tasks
    if (overdue === 'true') {
      query += ` AND t.due_date < CURRENT_DATE AND t.status != 'completed'`;
    }

    // Allowed sort columns
    const allowedSort = ['created_at', 'due_date', 'title'];
    if (!allowedSort.includes(sortBy)) sortBy = 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY t.${sortBy} ${sortOrder} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    res.json({ page, limit, count: result.rows.length, tasks: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, status, due_date, project_id, assigned_user_id } = req.body;
  try {
    const newTask = await pool.query(
      `INSERT INTO tasks (title, description, status, due_date, project_id, assigned_user_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, status || 'pending', due_date, project_id, assigned_user_id]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  try {
    const updatedTask = await pool.query(
      `UPDATE tasks SET title=$1, description=$2, status=$3, due_date=$4 WHERE id=$5 RETURNING *`,
      [title, description, status, due_date, id]
    );
    res.json(updatedTask.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};