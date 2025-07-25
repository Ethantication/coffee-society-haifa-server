const mongoose = require('mongoose');
 const CafeSchema = new mongoose.Schema({
     name: { type: String, required: true },
     address: { type: String, required: true },
     rating: { type: Number, default: 0 },
     isCommunityPartner: { type: Boolean, default: false },
     imageUrl: { type: String, default: 'https://placehold.co/600x400/CCCCCC/333333?text=Coffee+Shop' },
    description: { type: String, default: '' },
     menu: { type: Object, default: {} },
     baristas: { type: Array, default: [] }, // Array of { name: String, specialty: String, rating: Number }
    ratings: { type: Array, default: [] } // Array of { userId: String, rating: Number, review: String, timestamp: Number }
 });
module.exports = mongoose.model('Cafe', CafeSchema);
