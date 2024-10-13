import Seller from '../models/Sellerschema.js';
import bcrypt from 'bcrypt'; // Import bcrypt
import File from '../models/file.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';

export const registerSeller = async (req, res) => {
  const { name, email, password, latitude, longitude } = req.body; // Include password

  try {
   
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller with this email already exists' });
    }

 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword, 
      coordinates: {
        latitude,
        longitude
      }
    });

  
    await newSeller.save();

    res.status(201).json({ message: 'Seller registered successfully', seller: newSeller });
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ message: 'Server error while registering seller' });
  }
};



export const loginSeller = async (req, res) => {
  console.log("inside this request");
  const { email, password } = req.body;
  console.log(email);

  try {
    
      if (!email || !password) {
          return res.status(400).json({ message: 'Please provide both email and password' });
      }

     
      const seller = await Seller.findOne({ email });
      if (!seller) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      
      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }
      const payload = {
        id: seller._id,
        email: seller.email,
        name: seller.name,
        role: 'seller'  
    };

 
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      
      res.json({
          success: true,
          token,
          seller: {
              id: seller._id,
              name: seller.name,
              email: seller.email,
              verified: seller.verified,
              coordinates: seller.coordinates
          }
      });

  } catch (error) {
      console.error("Error logging in seller:", error);
      res.status(500).json({ message: 'Server error while logging in' });
  }
};



export const getProductUploadBySeller = async (req, res) => {
  try {
    const sellerId = req.params.id; 
    console.log('Seller ID:', sellerId);

    
    const products = await File.find({Sellerid: sellerId });
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};







export  const findNearbySellers = async (req, res) => {
  const { latitude, longitude } = req.query;
  console.log(latitude);
  console.log(longitude);
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const radiusInKm = 10;
    const radiusInRadians = radiusInKm / 6378.1; 

    const nearbySellers = await Seller.find({
      'coordinates': {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radiusInRadians],
        },
      },
    });

    res.json(nearbySellers);
  } catch (err) {
    console.error('Error finding nearby sellers:', err);
    res.status(500).json({ error: 'Server error' });
  }
};




