var async = require('asyncawait/async');
var await = require('asyncawait/await');
module.exports=(async (function(req,response){
	var result={
		status:0,
		msg:"success"
	}
	req.session.uid=null;
	response.end(JSON.stringify(result))
}))