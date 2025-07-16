import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchproductbyid, STATUSES } from '../../redux/Productslice';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { add } from '../../redux/Cartslice';

const DetailView = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.data[0]);
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    if (productId) {
      dispatch(fetchproductbyid(productId));
    }
  }, [dispatch, productId]);

  const handleAdd = (product) => {
    dispatch(add(product));
    navigate('/cart');
  };

  if (status === STATUSES.LOADING) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <Box textAlign="center" mt={5} color="red">
        Error loading product details. Please try again.
      </Box>
    );
  }

  return (
    <Box display="flex" flexWrap="wrap" padding={4} justifyContent="center" alignItems="flex-start" gap={4}>
      {product ? (
        <>
          <Box flex={1} minWidth="300px" maxWidth="450px">
            <img
              src={product.imageurl}
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
          </Box>

          <Box flex={1} minWidth="300px">
            <Typography variant="h4" fontWeight="bold" color="#006400" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              Used For: {product.description}
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="#006400" mb={1}>
              Price: ₹{product.price}
            </Typography>
            <Typography variant="h6" color="text.secondary" mb={4}>
              Tags: {product.tags}
            </Typography>

            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleAdd(product)}
                sx={{ backgroundColor: '#006400', '&:hover': { backgroundColor: '#004d00' } }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: '#006400',
                  borderColor: '#006400',
                  '&:hover': {
                    borderColor: '#004d00',
                    backgroundColor: 'rgba(0, 100, 0, 0.05)',
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Typography variant="h6" mt={4} color="text.secondary">
          Product not found
        </Typography>
      )}
    </Box>
  );
};

export default DetailView;




