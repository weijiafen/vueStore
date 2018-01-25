
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var Desk = sequelize.define('desk', {
  //桌号id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  //桌号名称
  name:{
    type: Sequelize.STRING 
  },
  //桌号所属商家id
  userId:{
    type:Sequelize.INTEGER
  },
  isDelete:{
    //桌子是否删除，1删除，0未删除
    type:Sequelize.INTEGER
  },
  createAt:{
    type:Sequelize.BIGINT
  },
  updateAt:{
    type:Sequelize.BIGINT
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  timestamps: false
});
module.exports=Desk
