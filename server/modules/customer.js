
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  dialectOptions:{
    charset:"utf8mb4",
    collate:"utf8mb4_general_ci"
  },
  pool: dbConfig.pool,
});
var customer = sequelize.define('customer', {
  //顾客id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  //微信openid
  openId:{
    type:Sequelize.STRING,
  },
  //顾客名称
  nickname:{
    type: Sequelize.STRING 
  },
  //顾客性别
  sex:{
    type: Sequelize.INTEGER 
  },
  //顾客所属省
  province:{
    type: Sequelize.STRING 
  },
  //顾客所属市
  city:{
    type: Sequelize.STRING 
  },
  //顾客所属国家
  country:{
    type: Sequelize.STRING 
  },
  //顾客头像
  headimgurl:{
    type: Sequelize.STRING 
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
module.exports=customer
