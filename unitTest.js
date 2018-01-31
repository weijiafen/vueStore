var crypto = require('crypto')
var request = require('request');
var parseString = require('xml2js').parseString;
module.exports=((function(){
	var xml=`<xml>
	        <appid>wxa9c22df153e7dd7b</appid>
	        <body>魏记小店-日用杂货</body>
	        <mch_id>1497990382</mch_id>
	        <nonce_str>abcdefg</nonce_str>
	        <notify_url>http://www.yslpartition.com/customer/payCallBack</notify_url>
	        <openid>oyMqK1jeRt6RQWlrF-3V7ZLch9S0</openid>
	        <out_trade_no>274</out_trade_no>
	        <spbill_create_ip>218.17.157.119</spbill_create_ip>
	        <total_fee>150</total_fee>
	        <trade_type>JSAPI</trade_type>
	        <sign>7C6334B4F56653D5C79D3AC5A3E3B5AC</sign>
	</xml>`
	var data={
		appid:'wxa9c22df153e7dd7b',
		body:'魏记小店-日用杂货',
		mch_id:'1497990382',
		nonce_str:'abcdefg',
		notify_url:'http://www.yslpartition.com/customer/payCallBack',
		openid:'oyMqK1jeRt6RQWlrF-3V7ZLch9S0',
		out_trade_no:271,
		spbill_create_ip:'218.17.157.119',
		total_fea:150,
		trade_type:'JSAPI',
		sign:''
	}
	request.post({
		url:'https://api.mch.weixin.qq.com/pay/unifiedorder',
		headers:{
			"Content-type":"text/xml;charset=UTF-8"
		},
		body:xml,
	},function(error,res1,body1){
		parseString(body1, function (err, result2) {
		    body1 = result2;
			console.log("prePay callback",body1.xml.return_code[0])
			// result.status=0
			// result.msg='拉取支付号成功'
			// result.data=body1
			// response.end(JSON.stringify(result))
		});
		return body1
	})
}))