var multiparty = require('multiparty');
var fs = require('fs');
module.exports= function(req,res){
	//生成multiparty对象，并配置上传目标路径
	var dstPath;
	var form = new multiparty.Form({uploadDir: './upload/file'});
	// var dstPath=form.file[0].path
	 //上传完成后处理
	form.parse(req, function(err, fields, files) {
	 	var filesTmp = JSON.stringify(files,null,2);
        
	 	if(err){
            console.log('parse error: ' + err);
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify({status:-1,msg:'图片上传异常'}));
        } else {
        	console.log('parse files: ' + filesTmp);
        	var inputFile = files.file[0];
        	var uploadedPath = inputFile.path;
        	var dstPath = '/file/' + getTempName(inputFile.originalFilename);
        	//重命名为真实文件名
        	fs.renameSync(uploadedPath, './upload'+dstPath, function(err) {
        		if(err){
        			console.log('rename error: ' + err);
        		} else {
        			console.log('rename ok');
        		}
        	});
        	res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
			res.end(JSON.stringify({status:0,msg:'server recieved file',src:dstPath}));
        }
    })
    function getTempName(fileName){
        var str=""
        for(var i=0;i<16;i++){
            str+=parseInt(Math.random()*10);
        }
        if(/.jpg$/.test(fileName)){
            str+=".jpg"
        }
        else if(/.jpeg$/.test(fileName)){
           str+=".jpeg" 
        }
        else if(/.png$/.test(fileName)){
           str+=".png" 
        }
        return str
    }
}