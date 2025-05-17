const bcrypt = require('bcrypt');
const { User, sequelize } = require('../models/User');

const startDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    
    const users = [
      {
        email: 'ada.lovelace@example.com',
        firstName: 'Ada',
        lastName: 'Lovelace',
        password: await bcrypt.hash('AlgoWoman1852*', 10),
        isAdmin: true,
        isVerified: true,
        verificationToken: null
      },
      {
        email: 'alan.turing@example.com',
        firstName: 'Alan',
        lastName: 'Turing',
        password: await bcrypt.hash('Enigma3945+', 10),
        isAdmin: false,
        isVerified: true,
        verificationToken: null
      },
      {
        email: 'denis.ritchie@example.com',
        firstName: 'Denis',
        lastName: 'Ritchie',
        password: await bcrypt.hash('Cunix1941!', 10),
        isAdmin: false,
        isVerified: true,
        verificationToken: null
      },
    ];

    await User.bulkCreate(users);
    console.log('Base de données et utilisateurs initiaux créés avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données :', error);
  }
};

module.exports = { startDatabase };