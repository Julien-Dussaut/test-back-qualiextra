// Rate limiter to avoid to many requests

const rateLimit = require('express-rate-limit');

exports.limiterGlobal = rateLimit({
  windowMs: process.env.TIME_GLOBAL_LIMITER || 15 * 60 * 1000,
  max: process.env.GLOBAL_REQUESTS_NUMBER || 100, 
  message: {
    error: 'Trop de requêtes, veuillez réessayer plus tard.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

exports.limiterLogin = rateLimit({
  windowMs: process.env.TIME_LOGIN_LIMITER || 15 * 60 * 1000,
  max: process.env.LOGIN_REQUESTS_NUMBER || 5,
  message: {
    error: 'Trop de requêtes, veuillez réessayer plus tard.'
  },
  skipSuccessfulRequests: true,
});

exports.resendEmailLimiter = rateLimit({
  windowMs: process.env.TIME_RESEND_EMAIL_LIMITER || 60 * 60 * 1000,
  max: process.env.RESEND_REQUESTS_NUMBER || 3,
  message: {
    error: 'Trop de demandes d\'email de vérification, veuillez réessayer plus tard.'
  }
});