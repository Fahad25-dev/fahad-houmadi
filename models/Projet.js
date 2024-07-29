const Sequelize = require('sequelize');
const sequelize = require('../database/db');

class Projet extends Sequelize.Model{}
module.exports  = Projet.init(
    {
        nom_projet:{
            type: Sequelize.STRING(200)
        },
        suivi:{
            type:Sequelize.STRING(200)
        },
        resource:{
            type: Sequelize.STRING(200)
        },
        duree:{
            type: Sequelize.STRING(200)
        },
    },
    {
        sequelize,
        modelName: 'Projet',
    }
)