const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    // Retrieve token from cookie httponly
    const token = req.cookies.token;
    if (!token) {
      const error = new Error('Token manquant.');
      error.statusCode = 401;
      throw error;
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      req.auth = {
        userId: decodedToken.userId,
        userFirstName: decodedToken.userFirstName
      };
      next();
    } catch(jwtError) {
      const error = new Error('Token invalide ou expiré.');
      error.statusCode = 401;
      error.originalError = jwtError;
      throw error;
    }
    
    next();
  } catch (error) {
    next(error);
  }
}