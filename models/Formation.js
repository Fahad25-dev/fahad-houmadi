const Sequelize  =  require('sequelize');
const sequelize = require('../database/db');

class Formation extends Sequelize.Model{}
module.exports = Formation.init(
    {
        nom_formation:{
            type: Sequelize.STRING(200)
        },
        adresse :{
            type: Sequelize.STRING(200)
        },
        date_debt: {
            type: Sequelize.STRING(100)
        },
        date_fn :{
            type: Sequelize.STRING(100)
        },
        nombre_participant :{
            type : Sequelize.STRING(100)
        },
        Montant : {
            type :Sequelize.INTEGER
        },
        Photo:{
            type: Sequelize.STRING(200)
        },
    },
    {
        sequelize,
        modelName : 'Formation'
    }
)