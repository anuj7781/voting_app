
const Sequelize = require('sequelize');

const db = new Sequelize(
    'dbname',
    'root',
    'mahi7781',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

const Users = db.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    date:Sequelize.STRING,
    voted:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})

const Candidates = db.define('candidates', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    count: {
        type:Sequelize.INTEGER,
        defaultValue:0
    }    
})
db.sync().then(() => console.log("Database is ready"))

exports = module.exports = {
    db,
    Users,
    Candidates
}