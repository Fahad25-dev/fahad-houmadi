const express = require('express')
const router = express.Router()

const ParticipantsController = require('../controllers/ParticipantsController')

router.get('/liste',ParticipantsController.liste);

module.exports = router;