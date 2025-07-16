import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Q6AQFHS50OAwldkP0NBPdAhEIKMFc3JbvI5PgEweFrhz2MkuUNqaQRoTzieaR8kq4L4inKeDYlyPgqm98SUmh1O00JZxxnTUq');

const Buy = ({ totalPrice, cartItems, setLoginDialogOpen }) => {
  const navigate = useNavigate();

  const cleanedCart = cartItems.map(item => ({
    name: item.name,
    image: item.imageurl, // imageurl -> image
    quantity: item.quantity,
    price: item.price,
  }));

  const handleStripeCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to proceed to payment.");
      setLoginDialogOpen(true);
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch('http://localhost:3000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ cartItems: cleanedCart }),
    });

    const session = await response.json();

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
        style={{
          padding: '10px 20px',
          backgroundColor: '#fb641b',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
        onClick={handleStripeCheckout}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Buy;

  