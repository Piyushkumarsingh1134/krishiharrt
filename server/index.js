import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './router/route.js';
import cors from 'cors';
import fileUpload from 'express-fileupload'; // Correct ES6 import for express-fileupload
import { cloudinaryconnect } from './config/cloudinary.js'; // ES6 import for cloudinary
import Stripe from 'stripe';

// Initialize dotenv
dotenv.config();

const app = express();
const stripe = Stripe('sk_test_51Q6AQFHS50OAwldkcQTIelUzS90q1IxCtZ6nbPGA3rTv5g2VRAAdk65BxM6QHahqCtjZUpY0WRIGce5hlhUIndOq00qoeeEeSB');

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
// New Stripe Checkout Session Route
app.post('/api/create-checkout-session', async (req, res) => {
    const { cartItems } = req.body; // Extract cart items from request body

    try {
        // Map cart items to Stripe line items
        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: [item.imageurl], // Use product image if available
                },
                unit_amount: item.price * 100, // Stripe requires price in cents (multiply by 100)
            },
            quantity: item.quantity,
        }));

        // Create a new Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${'http://localhost:5173'}/success`,  // Redirect URL after successful payment
            // cancel_url: `${process.env.FRONTEND_URL}/cancel`,    // Redirect URL if payment is canceled
        });

        // Send session ID back to frontend
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: 'Failed to create Stripe checkout session' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

