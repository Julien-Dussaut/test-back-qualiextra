const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


exports.login = async (req, res, next) => {
  try {
    // Try to find the user with it's email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      const error = new Error('Email ou mot de passe erroné - user inconnu.');
      error.statusCode = 401;
      throw error;
    }

    // Crypt and compare the password send with the password in database
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      const error = new Error('Email ou mot de passe erroné.');
      error.statusCode = 401;
      throw error;
    }

    // Check if the user has verified it's email address
    if (!user.isVerified) {
      const error = new Error('Vous devez vérifier votre email avant de vous connecter.')
      error.statusCode = 401;
      throw error;
    }

    // Token creation 
    const token = jwt.sign(
      { userId: user.id, userFirstName: user.firstName },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Set cookies httponly to make it inaccessible for the client or anyone else
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 6 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: 'Connexion réussie',
      userId: user.id,
      userFirstName: user.firstName
    });

  } catch (error) {
    next(error);
  }
};