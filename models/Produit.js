const Sequelize  =  require('sequelize')
const sequelize  = require('../database/db')

class Produit extends Sequelize.Model{}
module.exports  = Produit.init(
    {
        nom : {
            type : Sequelize.STRING(200)
        },
        categorie : {
            type : Sequelize.STRING(200)
        },
        quantite  : {
            type : Sequelize.INTEGER
        },
        prix : {
            type : Sequelize.INTEGER
        },
    },
    {
        sequelize,
        modelName: 'Produit'
    }
)