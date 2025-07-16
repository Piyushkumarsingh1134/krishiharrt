import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './Productcard';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/Cartslice'; 

const Seed = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/tag/seeds');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

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

  const handleAddToCart = (product) => {
    dispatch(add(product));
    navigate('/cart'); 
    console.log(`Added to cart: ${product.name}`);
  };

  return (
    <div className='flex flex-wrap gap-4 p-4'>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onAddToCart={() => handleAddToCart(product)} 
          />
        ))
      ) : (
        <p className='text-gray-600'>No seed products found.</p>
      )}
    </div>
  );
};

export default Seed;




