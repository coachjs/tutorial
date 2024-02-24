const dbConfig = require("../config/db.config.js")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect:dbConfig.dialect
    }
    );

const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("./tutorial.model.js")(sequelize,Sequelize);
db.comments = require("./comment.model.js")(sequelize,Sequelize);

// membuat relasi 
db.tutorials.hasMany(db.comments, { as : "comments"});
db.comments.belongsTo(db.tutorials,{
    foreignKey : "tutorialId",
    as : "tutorial"
});



module.exports = db;