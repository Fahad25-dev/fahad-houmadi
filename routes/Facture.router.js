const express = require('express');
const router = express.Router();
const FactureController = require('../controllers/FactureController')

router.get('/list',FactureController.list);
router.get('/add-form',FactureController.listfac);
router.get('/add-form',FactureController.listFactures);
router.post('/add',FactureController.ajouter);
router.get('/delete/:id',FactureController.delete);
router.get('/update/:id',FactureController.edit);
router.post('/update',FactureController.update);

module.exports = router;
