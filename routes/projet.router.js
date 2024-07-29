const express = require('express');
const router =  express.Router();
const ProjetController = require('../controllers/ProjetController')

router.get('/list',ProjetController.list)
router.get('/add-form',ProjetController.listProjet)
router.post('/add',ProjetController.ajouter)
router.get('/delete/:id',ProjetController.delete)
router.get('/update/:id',ProjetController.edit)
router.post('/update/',ProjetController.update)

module.exports = router;