import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin' });
  }
};



export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT with role
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' }, // Include role
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Admin authenticated', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};


