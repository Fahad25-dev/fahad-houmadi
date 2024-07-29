const Sequelize = require('sequelize')
const sequelize = new Sequelize('tstnode', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
module.exports = sequelize