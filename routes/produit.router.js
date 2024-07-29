const express = require('express');
const router = express.Router();
const ProduitController = require('../controllers/ProduitController');

router.get('/add-form', ProduitController.listProduit);
router.post('/add', ProduitController.ajouter);
router.get('/list', ProduitController.list)

router.get('/update/:id',ProduitController.edit)
router.post('/update', ProduitController.updateCate)
router.get('/delete/:id',ProduitController.delete)
router.get('/add-rechercher',ProduitController.rechercher)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'accl'));
});
  
module.exports = router;
