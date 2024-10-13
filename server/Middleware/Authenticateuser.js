
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const JWT_SECRET = 'your_jwt_secret';

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log('Extracted Token:', token); 
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET); 
      console.log('Decoded Token:', decoded); 
      req.user = { id: decoded.id, role: decoded.role };
      next(); 
    } catch (error) {
      console.error('Token verification error:', error); 
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
  