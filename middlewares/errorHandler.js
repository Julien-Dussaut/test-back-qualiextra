module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || 500; // Code d'erreur HTTP (par défaut 500)
  const message = error.message || 'Erreur interne du serveur.';
  res.status(statusCode).json({ message });
};