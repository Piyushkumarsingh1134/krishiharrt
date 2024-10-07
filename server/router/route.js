import express from 'express';
import { userLogIn, userSignUp } from '../controller/usercontroller.js';
import { imageupload,getProducts,getproductbyid } from '../controller/productcontroller.js';
import { getproductbytags } from '../controller/productcontroller.js';
import File from '../models/file.js';
import { adminLogin,registerAdmin } from '../controller/Admincontroller.js';
import Seller from '../models/Sellerschema.js'; 
import { registerSeller } from '../controller/Seller.js';
import { isAdmin } from '../Middleware/Adminmiddleware.js';
import { authenticateUser } from '../Middleware/Authenticateuser.js';
const router = express.Router();

// User routes
router.post('/signup', userSignUp);
router.post('/login', userLogIn);


router.post('/adminlogin', adminLogin);
router.post('/registerAdmin',registerAdmin );

router.post('/registerSeller',registerSeller);

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








// Simple route to verify a seller by ID
router.put('/verify-seller/:id',authenticateUser,isAdmin, async (req, res) => {
  try {
    const sellerId = req.params.id;
    console.log(sellerId);

    // Find the seller by ID and update the verified field to true
    const updatedSeller = await Seller.findByIdAndUpdate(
      sellerId,
      { verified: true },
      { new: true } // Returns the updated seller object
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ message: 'Seller verified successfully', seller: updatedSeller });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying seller', error });
  }
});









export default router;


