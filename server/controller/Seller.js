import Seller from '../models/Sellerschema.js';
import bcrypt from 'bcrypt'; // Import bcrypt

// Controller to register a new seller
export const registerSeller = async (req, res) => {
  const { name, email, password, latitude, longitude } = req.body; // Include password

  try {
    // Check if seller with the same email already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new seller with the hashed password
    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword, // Use hashed password
      coordinates: {
        latitude,
        longitude
      }
    });

    // Save seller to the database
    await newSeller.save();

    res.status(201).json({ message: 'Seller registered successfully', seller: newSeller });
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ message: 'Server error while registering seller' });
  }
};

