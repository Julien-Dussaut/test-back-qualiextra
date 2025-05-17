const { default: axios } = require('axios');
const { User } = require('../models/User');

exports.checkUserStatus = async (requestedId, requestingId) => {
  if (Number(requestedId) === Number(requestingId)) {
    return true;
  } else {
    const requestingUser = await User.findByPk(requestingId);
    if (!requestingUser) {
      throw new Error('Utilisateur faisant la demande non trouvé.');
    }
    return requestingUser.isAdmin;
  }
};

exports.checkDisposableEmail = async (email) => {
  try {
    const response = await axios.get(`https://disposable.debounce.io/?email=${email}`);
    return response.data.disposable === 'true';
  } catch (error) {
    throw new Error('Erreur lors de l\'appel API permettant de vérifier si l\'adresse mail est jetable / temporaire.');
  }
}