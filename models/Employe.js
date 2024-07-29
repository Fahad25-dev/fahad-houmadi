const Sequelize = require('sequelize');
const sequelize = require('../database/db');

class Employe extends Sequelize.Model{}
module.exports = Employe.init(
    {
        nom_employe:{
            type: Sequelize.STRING(200)
        },
        prenom_employe:{
            type: Sequelize.STRING(200)
        },
        adresse:{
            type: Sequelize.STRING(200)
        },
        affectation_employe:{
            type: Sequelize.STRING(200)
        },
        tache_employe:{
            type: Sequelize.STRING(200)
        },
        heure_travail:{
            type: Sequelize.STRING(200)
        },
        
    },
    {
        sequelize,
        modelName: 'Employe'
    }
)