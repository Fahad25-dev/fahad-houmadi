const express = require('express');
const router = express.Router()
//const update = require('../node_modules/multer/storage/multer')
//const upload = require('../HOUMADI/Desktop/applaravel/utilisateur/nodeapp/uploads/multerconfig');
const upload = require('../uploads/multerconfig');
//const upload = multer({ storage: storage });

const FormationController = require('../controllers/FormationController');

router.get('/list', FormationController.list);
router.get('/add',FormationController.formationlist)
router.post('/add',upload.single('photo'),FormationController.ajouterformation);


module.exports = router;



