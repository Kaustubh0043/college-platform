const db = require('../db');

exports.getQuestions = async (req, res) => {
  try {
    const query = `
      SELECT q.*, u.name as user_name 
      FROM questions q 
      JOIN users u ON q.user_id = u.id 
      ORDER BY q.created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const questionQuery = `
      SELECT q.*, u.name as user_name 
      FROM questions q 
      JOIN users u ON q.user_id = u.id 
      WHERE q.id = $1
    `;
    const question = await db.query(questionQuery, [id]);
    
    if (question.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const answersQuery = `
      SELECT a.*, u.name as user_name 
      FROM answers a 
      JOIN users u ON a.user_id = u.id 
      WHERE a.question_id = $1 
      ORDER BY a.created_at ASC
    `;
    const answers = await db.query(answersQuery, [id]);

    res.json({
      ...question.rows[0],
      answers: answers.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const query = 'INSERT INTO questions (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
    const result = await db.query(query, [userId, title, content]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.createAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const query = 'INSERT INTO answers (question_id, user_id, content) VALUES ($1, $2, $3) RETURNING *';
    const result = await db.query(query, [questionId, userId, content]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
