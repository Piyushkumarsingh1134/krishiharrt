
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const JWT_SECRET = 'your_jwt_secret';

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the header
    console.log('Extracted Token:', token); // Log the extracted token
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET); 
      console.log('Decoded Token:', decoded); // Log the decoded token
      req.user = decoded; // Attach user info to request
      next(); // Proceed to the next middleware
    } catch (error) {
      console.error('Token verification error:', error); // Log the error
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
  