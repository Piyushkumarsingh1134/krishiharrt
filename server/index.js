import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './router/route.js';
import cors from 'cors';
import fileUpload from 'express-fileupload'; // Correct ES6 import for express-fileupload
import { cloudinaryconnect } from './config/cloudinary.js'; // ES6 import for cloudinary

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Handle CORS

// Configure file upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// Set port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Cloudinary connection
cloudinaryconnect();

// Database connection
connection();

// Use the router for handling routes
app.use('/', Router);

// Basic route to check server
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

