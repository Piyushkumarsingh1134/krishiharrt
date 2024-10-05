import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProductCard from './Productcard';// Ensure the component name matches the exported name

const Fertilizers = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/tag/fertilizers');

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
    console.log(`Buying product: ${product.name}`);
    
  };

  const handleAddToCart = (product) => {
    navigate('/cart'); 
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
            onAddToCart={handleAddToCart} 
          />
        ))
      ) : (
        <p>No products found for fertilizers working on it.</p>
      )}
    </div>
  );
};

export default Fertilizers;
