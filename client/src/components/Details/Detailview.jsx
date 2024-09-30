import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchproductbyid } from '../../redux/Productslice'; // Import the action
import { STATUSES } from '../../redux/Productslice'; 
import { Box, Typography, Button } from '@mui/material'; // Material UI components
import { add } from '../../redux/Cartslice'

const DetailView = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const product = useSelector((state) => state.product.data[0]);
    const status = useSelector((state) => state.product.status);

    useEffect(() => {
        if (productId) {
            dispatch(fetchproductbyid(productId)); // Fetch product by ID
        }
    }, [dispatch, productId]);
    const handleadd =(product)=>{
        dispatch(add(product));
        navigate('/cart');
       }
   
    if (status === STATUSES.LOADING) {
        return <div>Loading...</div>;
    }

    if (status === STATUSES.ERROR) {
        return <div>Error loading product details. Please try again.</div>;
    }

    return (
        <Box display="flex" padding={4} justifyContent="center" alignItems="center">
            {product ? (
                <>
                    {/* Left side: Product image */}
                    <Box flex={1} display="flex" justifyContent="center">
                        <img
                            src={product.imageurl}
                            alt={product.name}
                            style={{ width: '400px', height: 'auto', borderRadius: '10px' }}
                        />
                    </Box>

                    {/* Right side: Product details */}
                    <Box flex={1} padding={4}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                           UsedFor: {product.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Price: {product.price}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                             used for: {product.tags}
                        </Typography>

                        {/* Buttons for Add to Cart and Buy Now */}
                        <Box marginTop={4} display="flex" gap={2}>
                            <Button variant="contained" color="primary" size="large"  onClick={()=>handleadd(product)
                            
                                
                            }>
                                Add to Cart
                            </Button>
                            <Button variant="contained" color="secondary" size="large">
                                Buy Now
                            </Button>
                        </Box>
                    </Box>
                </>
            ) : (
                <div>Product not found</div>
            )}
        </Box>
    );
};

export default DetailView;



