const Sequelize = require('sequelize')
const sequelize = require('../database/db')
const Produit = require('../models/Produit')
const Client = require('../models/Client')

class Commande extends Sequelize.Model{}
module.exports = Commande.init(
    {
        adresse:{
            type: Sequelize.STRING(100)
        },
        livre:{
            type: Sequelize.STRING(100)
        },
        date:{
            type: Sequelize.STRING(100)
        },
        montant:{
            type:Sequelize.STRING(100)
        },
    },
    {
        sequelize,
        modelName: 'Commande'
    }
)

Commande.belongsTo(Produit,{foreignKey:'produit_id'})
Commande.belongsTo(Client,{foreignKey:'client_id'})