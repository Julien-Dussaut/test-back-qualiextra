const { User } = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.auth.userId);

    if (!user) {
      const error = new Error('Utilisateur non trouvé.')
      error.statusCode = 404;
      throw error;
    }
    if (!user.isAdmin) {
      const error = new Error('Accès interdit : administrateur requis.')
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};