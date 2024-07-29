const express  = require('express')
const router = express.Router()
const FournisseurController = require('../controllers/FournisseurController');


router.get('/add-form',FournisseurController.listfournisseur);
router.get('/list',FournisseurController.list);
router.post('/add',FournisseurController. ajouterFournisseur);

router.get('/delete/:id',FournisseurController.delete);
router.get('/update/:id',FournisseurController.edit);
router.post('/update/',FournisseurController.update);


module.exports = router;