const express = require('express')
const router = express.Router()

const FormateurController =  require('../controllers/FormateurController')

router.get('/list',FormateurController.liste);
router.get('/add-form',FormateurController.listformateur);
router.get('/get',FormateurController.getlimit)
router.post('/add',FormateurController.ajouterformteur);
router.get('/delete/:id',FormateurController.delete)
router.get('/update/:id',FormateurController.edit)
router.post('/update/',FormateurController.updateFormateur)

module.exports = router;

