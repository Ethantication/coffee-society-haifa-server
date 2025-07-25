const Cafe = require('../models/Cafe'); // Make sure the path to Cafe model is correct

exports.getAllCafes = async (req, res) => {
    try {
        const cafes = await Cafe.find({}); // Fetch all cafes from the database
        res.status(200).json(cafes);
    } catch (error) {
        console.error("Error fetching cafes from DB:", error);
        res.status(500).json({ message: "Error fetching coffee shops", error: error.message });
    }
};

// You can add more controller functions here as needed
// For example:
// exports.getCafeById = async (req, res) => { /* ... */ };
// exports.createCafe = async (req, res) => { /* ... */ };
    