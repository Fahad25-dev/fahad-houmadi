const express = require('express')
const router = express.Router()
const VenteController = require('../controllers/VenteController')

router.get('/add-form',VenteController.ajouterClient)
router.post('/add',VenteController.ajouterVente)
router.get('/list',VenteController.list)
router.get('/delete/:id',VenteController.delete)
router.get('/update/:id',VenteController.edit)
router.post('/update',VenteController.update)
router.get('/add-rechcercherVente',VenteController.recherche)


module.exports = router;