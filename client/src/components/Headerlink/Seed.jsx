import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './Productcard';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/Cartslice'; // Ensure this path is correct based on your project structure

const Seed = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/tag/seeds');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array of products but got:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    dispatch(add(product));
     navigate('/Buy');
    console.log(`Buying product: ${product.name}`);
    // You can implement additional logic for buying the product here
  };

  const handleAddToCart = (product) => {
    dispatch(add(product)); // Correctly dispatch the add action
    navigate('/cart'); // Navigate to the /cart route
    console.log(`Adding to cart: ${product.name}`);
  };

  return (
    <div className='flex flex-wrap gap-4 p-4'>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onBuyNow={handleBuyNow} 
            onAddToCart={() => handleAddToCart(product)} // Pass product to handleAddToCart
          />
        ))
      ) : (
        <p>No products found for seeds.</p>
      )}
    </div>
  );
};

export default Seed;



