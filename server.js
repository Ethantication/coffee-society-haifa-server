const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Make sure 'cors' is installed: npm install cors
require('dotenv').config(); // This loads .env file variables into process.env

// Import your routes
const authRoutes = require('./routes/authRoutes'); // Assuming this path is correct

const app = express();

// ************* CORS Configuration *************
// CLIENT_ORIGIN will be set in Render environment variables (e.g., https://your-netlify-site.netlify.app)
// This ensures that only your Netlify frontend can make requests to this backend.
app.use(cors({
    origin: process.env.CLIENT_ORIGIN, // Use the environment variable for allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow necessary HTTP methods
    credentials: true, // Allow cookies and authorization headers to be sent cross-origin
}));

app.use(express.json()); // Middleware to parse JSON request bodies

// ************* Register your routes *************
// All routes under /api/auth will be handled by authRoutes
app.use('/api/auth', authRoutes);

// You might have other routes like:
// app.use('/api/cafes', cafeRoutes);
// app.use('/api/user', userRoutes);


// ************* MongoDB Connection *************
// Connect to MongoDB Atlas using the MONGO_URI environment variable
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        // ************* Start the server *************
        // Listen on the port provided by the hosting environment (Render sets process.env.PORT)
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error('❌ DB Error:', err)); // Log any MongoDB connection errors
