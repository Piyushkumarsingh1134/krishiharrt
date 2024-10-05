import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  remove,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../redux/Cartslice';
import Buy from './Buy';  // Import the Buy c

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart) || [];

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '20px' }}>
      <h3>Cart Page</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartItems.map((item) => (
              <div key={item._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                <img src={item.imageurl} alt={item.name} style={{ width: '100px', height: '100px' }} />
                <div>
                  <h5>{item.name}</h5>
                  <p>Price: ₹{item.price}</p>
                  <div>
                    <button
                      style={{ padding: '5px 10px', marginRight: '5px' }}
                      onClick={() => handleDecrease(item._id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      style={{ padding: '5px 10px', marginLeft: '5px' }}
                      onClick={() => handleIncrease(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#ff6161', color: '#fff' }}
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <h4>Total Price: ₹{totalPrice}</h4>
            <button
              style={{ padding: '10px 20px', backgroundColor: '#fb641b', color: '#fff' }}
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

            {/* Use the Buy component and pass totalPrice and cartItems as props */}
            <Buy totalPrice={totalPrice} cartItems={cartItems} /> 
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;





