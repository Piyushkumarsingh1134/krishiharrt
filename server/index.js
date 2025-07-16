import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './router/route.js';
import cors from 'cors';
import fileUpload from 'express-fileupload'; 
import { cloudinaryconnect } from './config/cloudinary.js'; 
import Stripe from 'stripe';

dotenv.config();

const app = express();
const stripe = Stripe('sk_test_51Q6AQFHS50OAwldkcQTIelUzS90q1IxCtZ6nbPGA3rTv5g2VRAAdk65BxM6QHahqCtjZUpY0WRIGce5hlhUIndOq00qoeeEeSB');


app.use(express.json()); 
app.use(cors()); 


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));


const port = process.env.PORT || 3000;


cloudinaryconnect();

connection();


app.use('/', Router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/create-checkout-session', async (req, res) => {
    const { cartItems } = req.body; 

    try {
      
        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: [item.imageurl],
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));

    
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${'http://localhost:5173'}/success`,  
      
        });

       
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: 'Failed to create Stripe checkout session' });
    }
});




app.post('/api/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;
  const authHeader = req.headers.authorization;

  try {
   
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decoded.id;

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
    });


    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = new Order({
      userId,
      items: cartItems,
      totalAmount,
      stripeSessionId: session.id,
      status: 'pending',
    });
    await order.save();

    
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});















// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

