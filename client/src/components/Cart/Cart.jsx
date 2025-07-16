import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  remove,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../redux/Cartslice';
import Buy from './Buy';
import LoginDialog from '../login/logindialog';

const Cart = () => {
  const dispatch = useDispatch();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [account, setAccount] = useState('');

  const cartItems = useSelector((state) => state.cart.cart) || [];

  const handleRemove = (id) => dispatch(remove(id));
  const handleIncrease = (id) => dispatch(increaseQuantity(id));
  const handleDecrease = (id) => dispatch(decreaseQuantity(id));
  const handleClearCart = () => dispatch(clearCart());

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold text-green-700 mb-6">Your Cart</h3>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={item.imageurl}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h5 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h5>
                    <p className="mt-2 text-green-600 font-semibold">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center">
                    <button
                      className="px-3 py-1 rounded-full bg-green-200 text-green-700 disabled:opacity-50"
                      onClick={() => handleDecrease(item._id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-4 text-gray-700 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 rounded-full bg-green-200 text-green-700"
                      onClick={() => handleIncrease(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="mt-4 self-start px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center">
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                Total: <span className="text-green-600">₹{totalPrice}</span>
              </h4>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-4">
              <button
                className="px-6 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <Buy
                totalPrice={totalPrice}
                cartItems={cartItems}
                setLoginDialogOpen={setLoginDialogOpen}
              />
            </div>
          </div>
        </>
      )}

      {/* 👇 Login dialog injected here */}
      <LoginDialog
        open={loginDialogOpen}
        setOpen={setLoginDialogOpen}
        setAccount={setAccount}
      />
    </div>
  );
};

export default Cart;






