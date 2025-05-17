// Personnalized express validator to ensure that the data received are conform

const { body, validationResult } = require('express-validator');


const emailRules = {
  create: [
    body('email')
      .isEmail().withMessage('L\'email doit être valide')
      .customSanitizer(value => value.trim().toLowerCase())
      .notEmpty().withMessage('L\'email est requis')
  ],
  update: [
    body('email')
      .optional()
      .isEmail().withMessage('L\'email doit être valide')
      .customSanitizer(value => value.trim().toLowerCase())
  ]
};

const nameRules = {
  create: [
    body('firstName')
      .notEmpty().withMessage('Le prénom est requis')
      .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères')
      .isAlpha('fr-FR', { ignore: ' -' }).withMessage('Le prénom ne peut contenir que des lettres, espaces et tirets'),
    body('lastName')
      .notEmpty().withMessage('Le nom est requis')
      .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
      .isAlpha('fr-FR', { ignore: ' -' }).withMessage('Le nom ne peut contenir que des lettres, espaces et tirets')
  ],
  update: [
    body('firstName')
      .optional()
      .isLength({ min: 2, max: 50 }).withMessage('Le prénom doit contenir entre 2 et 50 caractères')
      .isAlpha('fr-FR', { ignore: ' -' }).withMessage('Le prénom ne peut contenir que des lettres, espaces et tirets'),
    body('lastName')
      .optional()
      .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
      .isAlpha('fr-FR', { ignore: ' -' }).withMessage('Le nom ne peut contenir que des lettres, espaces et tirets')
  ]
};

const passwordRules = {
  create: [
    body('password')
      .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial')
  ],
  update: [
    body('password')
      .optional()
      .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial')
  ]
};

const adminRules = [
  body('isAdmin')
    .optional()
    .isBoolean().withMessage('isAdmin doit être un booléen')
];

// Validator for user creation
const validateUserCreate = [
  ...emailRules.create,
  ...nameRules.create,
  ...passwordRules.create,
  ...adminRules
];

// Validator for user update
const validateUserUpdate = [
  ...emailRules.update,
  ...nameRules.update,
  ...passwordRules.update,
  ...adminRules
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateUserCreate,
  validateUserUpdate,
  handleValidationErrors
};