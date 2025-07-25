// This script is meant to be run locally using Node.js
// It will connect to your MongoDB Atlas database and insert initial cafe data.

require('dotenv').config({ path: './.env' }); // Corrected path: Assumes .env is in the same directory as this script

const mongoose = require('mongoose');
const Cafe = require('./models/Cafe'); // Corrected path: Assumes model is in ./models relative to this script

// MongoDB Connection String (use your Atlas URI)
// IMPORTANT: This should ideally come from an environment variable in a real script.
// For simplicity in a one-off local run, you can directly paste it,
// but ensure it's your actual Atlas connection string with username/password.
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/coffee-society-haifa-db'; // Fallback to local if .env not loaded

const initialCafes = [
    {
        name: "Naima",
        address: "Sderot Ben Gurion 3, Haifa",
        rating: 4.5,
        isCommunityPartner: true,
        imageUrl: "https://placehold.co/600x400/9e6754/ffffff?text=Naima+Coffee",
        description: "Cozy atmosphere and excellent coffee selection.",
        menu: {
            "Espresso": "12 ILS",
            "Cappuccino": "15 ILS",
            "Filter Coffee": "18 ILS"
        },
        baristas: [
            { name: "Avi Cohen", specialty: "Latte Art", rating: 4.8 },
            { name: "Maya Levi", specialty: "Espresso Shots", rating: 4.6 }
        ]
    },
    {
        name: "Local Cafe",
        address: "HaBankim St 8, Haifa",
        rating: 4.2,
        isCommunityPartner: false,
        imageUrl: "https://placehold.co/600x400/8c7e6c/ffffff?text=Local+Cafe",
        description: "A neighborhood gem with a friendly vibe.",
        menu: {
            "Americano": "13 ILS",
            "Flat White": "16 ILS"
        },
        baristas: [
            { name: "Noa Barak", specialty: "Customer Service", rating: 4.5 }
        ]
    },
    {
        name: "Nuna",
        address: "Shabtai Levi St 13, Haifa",
        rating: 4.7,
        isCommunityPartner: true,
        imageUrl: "https://placehold.co/600x400/5a4d3f/ffffff?text=Nuna+Cafe",
        description: "Specialty coffee roasters with unique blends.",
        menu: {
            "Cold Brew": "20 ILS",
            "V60 Pour Over": "22 ILS"
        },
        baristas: [
            { name: "Yossi Israeli", specialty: "Roasting Expert", rating: 4.9 },
            { name: "Dana Shamir", specialty: "Filter Brews", rating: 4.7 }
        ]
    },
    {
        name: "Tsafon Roasters",
        address: "Derech HaAtzmaut 67, Haifa",
        rating: 4.8,
        isCommunityPartner: true,
        imageUrl: "https://placehold.co/600x400/3e352f/ffffff?text=Tsafon+Roasters",
        description: "Dedicated to the art of coffee roasting, direct trade beans.",
        menu: {
            "Espresso": "12 ILS",
            "Cappuccino": "15 ILS",
            "Filter Coffee": "18 ILS"
        },
        baristas: [
            { name: "Amir Cohen", specialty: "Roasting & Brewing", rating: 4.9 },
            { name: "Sara Levy", specialty: "Coffee Cupping", rating: 4.8 }
        ]
    },
    {
        name: "Ava",
        address: "Kibbutz Galuyot Rd 103, Haifa",
        rating: 4.0,
        isCommunityPartner: false,
        imageUrl: "https://placehold.co/600x400/a39281/ffffff?text=Ava+Coffee",
        description: "Charming cafe with a relaxed atmosphere.",
        menu: {
            "Latte": "16 ILS",
            "Tea": "10 ILS"
        },
        baristas: [
            { name: "Ben Bar", specialty: "Relaxed Vibe", rating: 4.2 }
        ]
    }
];

async function insertCafes() {
    try {
        console.log('Using MONGO_URI from environment:', process.env.MONGO_URI); // Log the URI from .env
        console.log('Connecting to:', mongoURI); // Log the resolved URI

        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected!');
        console.log('Connected to database:', mongoose.connection.name); // Log the actual database name

        // Log the collection name Mongoose will use for 'Cafe' model
        console.log('Attempting to delete and insert into collection:', Cafe.collection.name);


        console.log('Deleting existing cafes...');
        await Cafe.deleteMany({}); // Optional: Clears existing cafes to prevent duplicates
        console.log('Existing cafes deleted.');

        console.log('Inserting new cafes...');
        await Cafe.insertMany(initialCafes);
        console.log('Cafes inserted successfully!');

    } catch (err) {
        console.error('Error inserting cafes:', err);
    } finally {
        if (mongoose.connection.readyState === 1) { // 1 means connected
            await mongoose.disconnect();
            console.log('MongoDB disconnected.');
        }
    }
}

insertCafes();
