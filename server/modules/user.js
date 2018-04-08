
var Sequelize=require('sequelize')
var dbConfig=require('../connection/dbConfig.js')
var sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: dbConfig.pool,
});
var User = sequelize.define('user', {
  //用户id
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement: true
  },
  account: {
    //账号
    type: Sequelize.STRING,
    'unique': true   
  },
  //密码
  password: {
    type: Sequelize.STRING
  },
  //用户名
  userName:{
    type: Sequelize.STRING
  },
  //店铺公告
  notice:{  
    type: Sequelize.STRING
  },
  //正在营业
  openBusiness:{
    type:Sequelize.INTEGER,
  },
  //店铺头像
  photo:{  
    type: Sequelize.STRING
  },
  //最近一次登录时间
  lastLoginAt:{
    type:Sequelize.BIGINT
  },
  expireTime:{
    type:Sequelize.BIGINT
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
module.exports=User
