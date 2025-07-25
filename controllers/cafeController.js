const Cafe = require('../models/Cafe'); // Ensure this path is correct

exports.getAllCafes = async (req, res) => {
    try {
        console.log('Attempting to fetch all cafes from collection:', Cafe.collection.name);
        const cafes = await Cafe.find({});
        console.log('Cafes found from DB:', cafes.length, 'cafes');
        console.log('Data returned by Cafe.find({}):', JSON.stringify(cafes));
        res.status(200).json(cafes);
    } catch (error) {
        console.error('Error fetching all cafes:', error);
        res.status(500).json({ message: 'Error fetching coffee shops', error: error.message });
    }
};

// New function to get a single cafe by ID
exports.getCafeById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        console.log('Attempting to fetch cafe with ID:', id);
        const cafe = await Cafe.findById(id); // Use findById to search by _id

        if (!cafe) {
            console.log('Cafe not found for ID:', id);
            return res.status(404).json({ message: 'Coffee shop not found' });
        }

        console.log('Cafe found for ID:', id, JSON.stringify(cafe));
        res.status(200).json(cafe);
    } catch (error) {
        console.error('Error fetching cafe by ID:', req.params.id, error);
        // Handle CastError if ID format is invalid
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid coffee shop ID format' });
        }
        res.status(500).json({ message: 'Error loading coffee shop details', error: error.message });
    }
};
