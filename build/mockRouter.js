var fs=require('fs');
var mockConfig=[
	{
		//  url:  /users/user/:id
		//  fileUrl:  mock/users/get_user1.json 
		path:"users",
		api:"user",
		param:"id"
	},
	{
		path:"order",
		api:"orderList",
		param:"id"
	}
]
module.exports=function(app){
	for(mockItem of mockConfig){
		var url=`/${mockItem.path}/${mockItem.api}`;
		if(mockItem.param){
			url+=`/:${mockItem.param}`
		}
		app.all(url, function (req, res) {
			var method=req.method.toLowerCase()
			var fileUrl=`mock/${mockItem.path}/${method}_${mockItem.api}`;
			if(mockItem.param){
				var param=req.params[mockItem.param]
				fileUrl+=`${param}.json`
			}else{
				fileUrl+='.json'
			}
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