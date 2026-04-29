const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/college.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', collegeController.getColleges);
router.get('/saved', authMiddleware, collegeController.getSavedColleges);
router.get('/predict', collegeController.predictColleges);
router.get('/:id', collegeController.getCollegeById);
router.post('/save', authMiddleware, collegeController.saveCollege);

module.exports = router;
