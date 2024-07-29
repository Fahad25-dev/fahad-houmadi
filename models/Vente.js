const Sequelize = require('sequelize')
const sequelize = require('../database/db')
const  Produit  = require('../models/Produit')
const  Client  = require('../models/Client')

class Vente extends Sequelize.Model{}
module.exports = Vente.init(
    {
        quantite : {
            type : Sequelize.INTEGER
        },
        prix : {
            type : Sequelize.INTEGER
        },
    },
    {
        sequelize,
        modelName: 'Vente'
    }
) 
Vente.belongsTo(Produit,{foreignKey:'produit_id'})
Vente.belongsTo(Client,{foreignKey:'client_id'})



//Produit.belongsTo(Categorie,{foreignKey:'categories_id'})