const express = require('express');
const router = express.Router();

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const CommandeController = require('../controllers/CommandeController');

router.get('/list',CommandeController.list)
router.get('/add-form',CommandeController.listCommande)
router.post('/add',CommandeController.ajouterCommande)
router.get('/delete/:id',CommandeController.delete)
router.get('/update/:id',CommandeController.edit)
router.post('/update',CommandeController.update)
router.get('/add-rechercher',CommandeController.rechercher)

// Route pour bloquer ou débloquer une commande
router.post('/commande/bloque/:id', csrfProtection, CommandeController.bloque);



module.exports = router;
