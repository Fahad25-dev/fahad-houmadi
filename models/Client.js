const Sequelize = require('sequelize')
const sequelize  = require('../database/db')

class Client extends Sequelize.Model{}
module.exports = Client.init(
    {
        nomclient: {
            type : Sequelize.STRING(250)
        },
        prenom : {
            type : Sequelize.STRING(230)
        },
        adresse : {
            type : Sequelize.STRING(200)
        },
        email: {
            type : Sequelize.STRING(300)
        },
        contact : {
            type : Sequelize.INTEGER
        },

    },
    {
        sequelize,
        modelName :'Client'
    }

)