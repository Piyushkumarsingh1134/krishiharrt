export const isAdmin = (req, res, next) => {
    console.log('User Info:', req.user); // Log user info for debugging
    if (req.user && req.user.role === 'admin') {
      return next(); // Proceed to the next middleware or route handler
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  };
  
  