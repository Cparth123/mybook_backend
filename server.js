require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');

const itemsRoutes = require('./routes/items');
const userRoutes = require('./routes/authRoutes'); // User Authentication Routes
require('./config/passport'); // Google OAuth Config

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB()
    .then(() => {
        // Middleware
        app.use(bodyParser.json());
        app.use(cors());
        app.use(express.json()); // For parsing application/json

        // Sessions for OAuth
        app.use(
            session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false })
        );
        app.use(passport.initialize());
        app.use(passport.session());

        // Routes
        app.use('/api/items', itemsRoutes);
        app.use('/api/users', userRoutes); // User Authentication Routes

        // Start Server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    });
