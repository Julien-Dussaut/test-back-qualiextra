const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const { User } = require('../models/User');
const utils = require('../utils/utils');

exports.userList = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.userCreate = async (req, res, next) => {
  try {
    // Check if the mail address is a temporary or disposable email
    if (await utils.checkDisposableEmail(req.body.email)) {
      const error = new Error('Les adresses mails temporaires ne sont pas autorisées.');
      error.statusCode = 400;
      throw error;
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    
    // Verification token creation
    const verificationTokenRaw = crypto.randomBytes(32).toString('hex');

    // Crypt verification token to improve security
    const verificationTokenHashed = crypto.createHash('sha256').update(verificationTokenRaw).digest('hex');

    const user = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      isAdmin: req.body.isAdmin || false,
      isVerified: false,
      verificationToken: verificationTokenHashed,
    });

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;
    const verificationLink = `${baseUrl}/verify-email/${verificationTokenRaw}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Vérification de votre email',
      text: `Cliquez sur ce lien pour vérifier votre email : ${verificationLink}`,
    });
    
    res.status(201).json({ message: 'Utilisateur créé.' });
  } catch (error) {
    next(error);
  }
};

exports.userVerify = async (req, res, next) => {
  const token = req.params.token;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  try {
    const user = await User.findOne({
      where: {
        verificationToken: hashedToken,
      },
    });

    if (!user) {
      const error = new Error('Token de vérification invalide.' );
      error.statusCode = 400;
      throw error;
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: 'Email vérifié. Merci !' });
  } catch (error) {
    next(error);
  }
};

exports.userRead = async (req, res, next) => {
  try {
    const requestedUserId = Number(req.params.id);
    const requestingUserId = Number(req.auth.userId);

    // Check if the user can see the data (same user or admin = ok, else = no)
    const userCanPerformAction = await utils.checkUserStatus(requestedUserId, requestingUserId);
    if (!userCanPerformAction) {
      const error = new Error('Accès interdit.');
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findByPk(requestedUserId);
    if (!user) {
      const error = new Error('Utilisateur non trouvé.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.userUpdate = async (req, res, next) => {
  try {
    const requestedUserId = Number(req.params.id);
    const requestingUserId = Number(req.auth.userId);
    const updateData = { ...req.body };

    // Check if the user can update data (same user or admin = ok, else = no)
    const userCanPerformAction = await utils.checkUserStatus(requestedUserId, requestingUserId);

    if (!userCanPerformAction) {
      const error = new Error('Accès interdit.');
      error.statusCode = 403;
      throw error;
    }
    const user = await User.findByPk(requestedUserId);
    if (!user) {
      const error = new Error('Utilisateur non trouvé.');
      error.statusCode = 404;
      throw error;
    }

    if (updateData.password) {
      
      try {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        updateData.password = hashedPassword;
      } catch (err) {
        const error = new Error('Erreur lors du hashage du mot de passe.');
        error.statusCode = 500;
        throw error;
      }
    }
    await user.update(updateData);

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user });
  } catch (error) {
    next(error);
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    const idUserToDelete = req.params.id;
    const user = await User.findByPk(idUserToDelete);

    if (!user) {
      const error = new Error('Utilisateur non trouvé.');
      error.statusCode = 404;
      throw error;
    }

    await user.destroy();

    res.status(200).json({ message: 'Utilisateur supprimé.' });
  } catch (error) {
    next(error);
  }
};
