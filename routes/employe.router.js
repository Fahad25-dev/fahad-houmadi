const  express = require('express');
const router =  express.Router();

const EmployeController = require('../controllers/EmployeController')

router.get('/list', EmployeController.list );
router.get('/add-form', EmployeController.listemployer);
router.post('/add',EmployeController.ajouter);
router.get('/delete/:id',EmployeController.delete);
router.get('/update/:id',EmployeController.edit);
router.post('/update',EmployeController.update);
module.exports = router;