const mongoose = require('mongoose');

const CafeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, default: 0 },
    isCommunityPartner: { type: Boolean, default: false },
    imageUrl: { type: String, default: 'https://placehold.co/600x400/CCCCCC/333333?text=Cafe+Image' },
    description: { type: String, default: '' },
    menu: { type: Object, default: {} }, // Example: { "Coffee A": "Price", "Coffee B": "Price" }
    baristas: {
        type: [{
            name: { type: String, required: true },
            specialty: { type: String, default: '' },
            rating: { type: Number, default: 0 }
        }],
        default: []
    }
}, { collection: 'cafes' }); // <--- THIS IS THE CRITICAL CHANGE

module.exports = mongoose.model('Cafe', CafeSchema);
