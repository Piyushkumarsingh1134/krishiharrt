import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of a component's render to avoid reloading on every render
const stripePromise = loadStripe('pk_test_51Q6AQFHS50OAwldkP0NBPdAhEIKMFc3JbvI5PgEweFrhz2MkuUNqaQRoTzieaR8kq4L4inKeDYlyPgqm98SUmh1O00JZxxnTUq'); // Replace with your Stripe public key

const Buy = ({ totalPrice, cartItems }) => {
  const handleStripeCheckout = async () => {
    const stripe = await stripePromise;

    // Send request to your backend to create a Checkout Session
    const response = await fetch('http://localhost:3000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout page
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <button
        style={{ padding: '10px 20px', backgroundColor: '#fb641b', color: '#fff' }}
        onClick={handleStripeCheckout}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Buy;


  