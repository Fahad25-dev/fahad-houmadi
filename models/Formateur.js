const Sequelize = require('sequelize');
const sequelize = require('../database/db');

class Formateur extends Sequelize.Model{}
module.exports = Formateur.init(
    {
        nom_formateur:{
            type: Sequelize.STRING(100)
        },
        prenom_formateur:{
            type:Sequelize.STRING(100)
        },
        adresse_formateur:{
            type :Sequelize.STRING(100)
        },
        affectation_formateur:{
            type:Sequelize.STRING(200)
        },
        heure_travailler:{
            type:Sequelize.STRING(100)
        },
        duree_traviller:{
            type: Sequelize.STRING(100)
        },

    },

    {
        sequelize,
        modelName : 'Formateur'
    }
)

