var svgCaptcha = require('svg-captcha');
module.exports=function(req,res){
	var captcha = svgCaptcha.create();
	req.session.captcha = captcha.text;
	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha.data);
}