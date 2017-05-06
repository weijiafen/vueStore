# vueStore

> 一个基于vue和node的点餐系统

## 部署项目

``` bash
# 安装依赖文件（前后端依赖都是用npm）
npm install

# 在localhost:8080启动一个热加载的服务器
npm run dev

# 打包生产环境的文件。
npm run build

# 启动生产环境服务器
node server.js
```
## 项目结构
```
vueStore
|——build·········开发和生成环境的webpack配置
|——config········webpack使用到的配置文件
|——dist··········npm run build 编译出来的生产环境文件
|——mock·········模拟数据存放的文件夹
|——node_modules······依赖文件
|——src·······源代码
    |——assets······用于import的静态文件
    |——component····存放所有模块可以公用的组件
    |——module······多个单页面应用，每一个module都是一个单页面应用
        |——customer······客户点餐模块
        |——manager·······管理后台模块
            |——component·····模块私有组件
            |——router·····模块路由
            |——store····vuex状态管理
            |    |——modules····每个对象作为一个状态模块
            |——manager.html···入口页面
            |——manager.js·····入口脚本文件
            |——App.vue····挂载vue-router的总容器
|——static·····开发存放的静态文件
```
### mock方式
前后端分离开发的模式，mock数据是关键的一步，只要接口约定好，前端的开发就不需要等后台写好接口后才能开始接口的接入了。以前我mock数据是用一种比较土的方法，直接在一个文件夹新建一个.json文件，接口去请求这个文件拿到数据。但是这个方法有两个缺点，一个是url是xx/xxx.json，联调的时候你还要把每个接口都改回来；另一个就是post似乎不能用，只能get。所以在这个项目里我尝试用node搭一个代理，通过配置完整的接口url，node去读取特定的json文件传给前端，这样就解决了上面两个问题。
上面build文件夹中有一个mockRouter.js
```
var fs=require('fs');
var mockConfig=[
	{
		//  url:  /users/user/:id
		//example: get   /users/user/1
		//  fileUrl:  mock/users/get_user1.json 
		path:"users",
		api:"user",
		params:["id"]
	},
	{
		//  url:  /order/orderList/:id/:type
		//example: get  /order/orderList/1/1
		//  fileUrl:  mock/order/get_orderList11.json 
		path:"order",
		api:"orderList",
		params:["id","type"]
	}
]
module.exports=function(app){
	for(let mockItem of mockConfig){
		let url=`/${mockItem.path}/${mockItem.api}`;
		if(mockItem.params&&mockItem.params.length>0){
			for(param of mockItem.params)
			url+=`/:${param}`
		}
		console.log("url",url)
		app.all(url, function (req, res) {
			var method=req.method.toLowerCase()
			let fileUrl=`mock/${mockItem.path}/${method}_${mockItem.api}`;
			if(mockItem.params&&mockItem.params.length>0){
				for(param of mockItem.params){
					var reqParam=req.params[param]
					fileUrl+=`${reqParam}`
				}
			}
			fileUrl+='.json'
			console.log("url",url)
			console.log("fileUrl",fileUrl)
			fs.readFile(fileUrl,function(err,data){
				if(err){
					var obj={
						status:1,
						msg:"未知接口"
					}
					res.end(JSON.stringify(obj));
				}
				else{
					setTimeout(function(){
						res.end(data.toString());
					},600)
					
				}
			})
		})
	}
	
}
```
通过在mockConfig配置接口url，就能拿到特定的文件，注释上也写的很清楚了。
在build/dev-server.js中我加了两行代码，使express应用这个路由
```
var mockRouter=require('./mockRouter')
//这句是文件里已经存在的实例化express
var app = express()
//mock数据转发路由配置
mockRouter(app);
```
这样在npm run dev开发中就可以达到本地Mock数据的目的了。