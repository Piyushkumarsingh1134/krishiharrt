import React from 'react';

const ProductCard = ({ product, onBuyNow, onAddToCart }) => {
  return (
    <div className='w-[250px] bg-white p-5 rounded-md shadow-lg transition-transform duration-300 hover:scale-105'>
      <img 
        src={product.imageurl} 
        alt={product.name} 
        className="w-full h-[130px] object-cover rounded-md mb-2 transition-transform duration-500 ease-in-out hover:scale-105"
      />
      <h2 className='font-bold text-lg mb-1'>{product.name}</h2>
      <span className='text-green-600 font-semibold mb-2'>₹{product.price}</span>
      <p className='text-gray-700 text-sm mb-2'>{product.description}</p>
      
      <div className='flex gap-2'>
        <button 
          onClick={() => onAddToCart(product)} 
          className='w-full bg-green-600 text-white font-semibold py-1 rounded-md hover:bg-green-700 transition duration-300'
        >
          Add to Cart
        </button>
        <button 
          onClick={() => onBuyNow(product)} 
          className='w-full bg-green-600 text-white font-semibold py-1 rounded-md hover:bg-green-700 transition duration-300'
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;



