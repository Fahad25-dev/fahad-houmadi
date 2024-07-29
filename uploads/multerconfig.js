// Importer les modules nécessaires
const express = require('express');
const multer = require('multer');
const FormationController = require('../controllers/FormationController'); // Assurez-vous que le chemin est correct

// Configurer multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Répertoire de destination des fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom du fichier
  }
});

const upload = multer({ storage: storage });



module.exports = upload;
