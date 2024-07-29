const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/inscription', function(req, res) {
    // Logique de création de compte utilisateur...
    // Envoyer un e-mail de confirmation d'inscription
    const email = req.body.email;
    emailController.sendRegistrationConfirmationEmail(email);
    res.send('Inscription réussie ! Un e-mail de confirmation a été envoyé.');
});

module.exports = router;
