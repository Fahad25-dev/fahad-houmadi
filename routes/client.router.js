const express  = require('express')
const router = express.Router()
const ClientController = require('../controllers/ClientController')
//const { route } = require('./produit.router')
router.get('/add-form',ClientController.listClient);
router.get('/list',ClientController.list);
router.post('/client/add', ClientController.ajouterClient);
router.get('/delete/:id',ClientController.delete)
router.get('/update/:id',ClientController.edit)
router.post('/update/',ClientController.update)

module.exports = router;