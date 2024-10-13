export const isSeller = (req, res, next) => {
    console.log('User Info:', req.user); 
    if (req.user && req.user.role === 'seller') {
      req.sellerId = req.user.id;
      return next(); 
    }
    return res.status(403).json({ message: 'Access denied.seller only.' });
  };
  