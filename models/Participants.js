const Sequelize = require('sequelize');
const sequelize = require('../database/db');
const Formation = require('../models/Formation');


class Participants extends Sequelize.Model {};
module.exports = Participants.init(
    {
        nom:{
            type: Sequelize.STRING(100)
        },
        prenom:{
            type:Sequelize.STRING(100)
        },
        adresse:{
            type:Sequelize.STRING(100)
        },
        email:{
            type:Sequelize.STRING(200)
        },
        telephone:{
            type:Sequelize.STRING(200)
        },
    },
    {
        sequelize,
        modelName: 'Participants'
    }
)

Participants.belongsTo(Formation,{foreignKey:'FormationsId'});