const { Sequelize, DataTypes } = require("sequelize");
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'data', 'database.sqlite'),
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Format d'email invalide"
      },
      notEmpty: {
        msg: "L'email ne peut pas être vide"
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Le prénom ne peut pas être vide"
      },
      len: {
        args: [2, 50],
        msg: "Le prénom doit contenir entre 2 et 50 caractères"
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Le nom ne peut pas être vide"
      },
      len: {
        args: [2, 50],
        msg: "Le nom doit contenir entre 2 et 50 caractères"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Le mot de passe ne peut pas être vide"
      },
    }
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { User, sequelize };