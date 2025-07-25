
const Cafe = require('../models/Cafe'); // Assuming you have a Cafe model defined

exports.getAllCafes = async (req, res) => {
    try {
        const cafes = await Cafe.find({}); // Fetch all cafes from the database
        res.status(200).json(cafes);
    } catch (error) {
        console.error("Error fetching cafes from DB:", error);
        res.status(500).json({ message: "Error fetching coffee shops", error: error.message });
    }
};