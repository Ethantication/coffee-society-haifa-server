const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafeController');

// Route to get all cafes
router.get('/', cafeController.getAllCafes);

// Route to get a single cafe by ID (including its baristas)
// This route should come AFTER the general / route for specific matching
router.get('/:id', cafeController.getCafeById);

module.exports = router;
