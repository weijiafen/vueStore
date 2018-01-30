var crypto = require('crypto')
module.exports=((function(){
	var jsapi_ticket='HoagFKDcsGMVCIY2vOjf9pBu2_J-jMuI1QK-Wv6XxiQkVuL1LPM5QE24cMexm6e-z5FKUd2dg1PedkkEPaGWdQ'
	var noncestr='abcdefg'
	var timestamp=1517302065
	var url='http://www.yslpartition.com/customer.html?code=011qLmYk2opZZG0AVvWk2Jg5Yk2qLmYM&state=STATE'
	var string1='jsapi_ticket='+jsapi_ticket+
		'&noncestr='+noncestr+'&timestamp='+timestamp
		+'&url='+url
	var sha1 = crypto.createHash('sha1');
	var signature= sha1.update(string1).digest('hex');
	return signature
}))