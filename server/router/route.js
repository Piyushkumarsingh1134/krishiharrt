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
    console.log("Received tag:", tag); 

    try {
        
        const products = await File.find({ tags: tag });

       
        if (products.length === 0) {
           
            return res.status(404).json({ msg: 'No products found for the provided tag.' });
        }

        console.log("Products retrieved:", products); 
        res.json(products); 
    } catch (error) {
        console.error("Error fetching products:", error); 
        res.status(500).json({ error: 'Error retrieving products' });
    }
});

export default router;


