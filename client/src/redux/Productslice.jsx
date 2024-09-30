import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING', // Consistent casing
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.SUCCESS,
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Middleware to fetch products
export function fetchproducts() {
    return async function fetchproductThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch("http://localhost:3000/products");
            const data = await res.json();
            
            if (data.success && Array.isArray(data.products)) {
                dispatch(setProducts(data.products));
                dispatch(setStatus(STATUSES.SUCCESS));
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export function fetchproductbyid(productId) {
    return async function fetchproductThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch(`http://localhost:3000/products/${productId}`);
            const data = await res.json();
            
            console.log('API response:', data); // Log the response for debugging

            if (data.success && Array.isArray(data.products)) {
                // Since it's always an array, find the product by its ID
                const product = data.products.find((p) => p._id === productId);
                
                if (product) {
                    dispatch(setProducts([product])); // Wrap it in an array to maintain consistency
                    dispatch(setStatus(STATUSES.SUCCESS));
                } else {
                    throw new Error('Product not found');
                }
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
