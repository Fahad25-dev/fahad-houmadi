const Sequelize = require('sequelize');
const sequelize = require('../database/db')

class Fournisseur extends Sequelize.Model{}
module.exports = Fournisseur.init(
    {
        nom:{
            type: Sequelize.STRING(200)
        },
        prenom:{
            type: Sequelize.STRING(300)
        },
        adresse: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(200)
        },
        telephone: {
            type: Sequelize.INTEGER
        },
    },
    {
        sequelize,
        modelName: 'Fournisseur'
    }
)