import express from 'express';
import { userLogIn, userSignUp } from '../controller/usercontroller.js';
import { imageupload,getProducts,getproductbyid } from '../controller/productcontroller.js';
import { getproductbytags } from '../controller/productcontroller.js';
import File from '../models/file.js';

const router = express.Router();

// User routes
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

// Image upload route
router.post('/imageupload', imageupload);
router.get('/products/:id',getproductbyid);

router.get('/products',getProducts);

router.get('/products/tag/:tag', async (req, res) => {
    const { tag } = req.params;
    console.log("Received tag:", tag); // Log the received tag for debugging

    try {
        // Fetch products that match the given tag
        const products = await File.find({ tags: tag });

        // Check if products were found
        if (products.length === 0) {
            // If no products found, send a 404 response with an error message
            return res.status(404).json({ msg: 'No products found for the provided tag.' });
        }

        console.log("Products retrieved:", products); // Log the retrieved products
        res.json(products); // Respond with the found products
    } catch (error) {
        console.error("Error fetching products:", error); // Log any errors for debugging
        res.status(500).json({ error: 'Error retrieving products' });
    }
});

export default router;


