const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Client = require('../models/Client')
const Employe = require('../models/Employe')
const Projet = require('../models/Projet')

class Facture extends Sequelize.Model{}

module.exports = Facture.init(
    {
        adress:{
            type: Sequelize.STRING(80)
        },
        datadebt :{
            type: Sequelize.STRING(30)
        },
        datadefn :{
            type: Sequelize.STRING(30)
        },
        montant :{
            type: Sequelize.INTEGER
        },
    },
    {
        sequelize,
        modelName:'Facture'
    }
)

Facture.belongsTo(Client,{as: 'client', foreignKey:'clientId'})
Facture.belongsTo(Employe,{as:'employe' ,foreignKey:'employeId'})
Facture.belongsTo(Projet,{as: 'projet', foreignKey:'projetId'})
