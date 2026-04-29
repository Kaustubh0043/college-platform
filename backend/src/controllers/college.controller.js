const db = require('../db');

exports.getColleges = async (req, res) => {
  try {
    const { search, location, minFee, maxFee, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let queryText = 'SELECT * FROM colleges WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (search) {
      queryText += ` AND name ILIKE $${paramCount}`;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (location) {
      queryText += ` AND location ILIKE $${paramCount}`;
      params.push(`%${location}%`);
      paramCount++;
    }

    if (minFee) {
      queryText += ` AND fees >= $${paramCount}`;
      params.push(minFee);
      paramCount++;
    }

    if (maxFee) {
      queryText += ` AND fees <= $${paramCount}`;
      params.push(maxFee);
      paramCount++;
    }

    // Count total for pagination
    const countRes = await db.query(queryText.replace('SELECT *', 'SELECT COUNT(*)'), params);
    const total = parseInt(countRes.rows[0].count);

    // Add pagination
    queryText += ` ORDER BY id LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const colleges = await db.query(queryText, params);

    res.json({
      colleges: colleges.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const collegeRes = await db.query('SELECT * FROM colleges WHERE id = $1', [id]);

    if (collegeRes.rows.length === 0) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Get reviews for this college
    const reviewsRes = await db.query('SELECT * FROM reviews WHERE college_id = $1 ORDER BY created_at DESC', [id]);

    const college = collegeRes.rows[0];
    college.reviews = reviewsRes.rows;

    res.json(college);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.saveCollege = async (req, res) => {
  try {
    const { collegeId } = req.body;
    const userId = req.user.id;

    // Check if already saved
    const checkRes = await db.query(
      'SELECT * FROM saved_colleges WHERE user_id = $1 AND college_id = $2',
      [userId, collegeId]
    );

    if (checkRes.rows.length > 0) {
      return res.status(400).json({ message: 'College already saved' });
    }

    await db.query(
      'INSERT INTO saved_colleges (user_id, college_id) VALUES ($1, $2)',
      [userId, collegeId]
    );

    res.status(201).json({ message: 'College saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getSavedColleges = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT c.* FROM colleges c
      JOIN saved_colleges sc ON c.id = sc.college_id
      WHERE sc.user_id = $1
    `;
    const savedColleges = await db.query(query, [userId]);
    res.json(savedColleges.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.predictColleges = async (req, res) => {
  try {
    const { rank } = req.query;
    if (!rank) return res.status(400).json({ message: 'Rank is required' });

    // Find colleges where cutoff_rank >= student_rank
    const query = 'SELECT * FROM colleges WHERE cutoff_rank >= $1 ORDER BY rating DESC';
    const colleges = await db.query(query, [rank]);

    res.json(colleges.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

