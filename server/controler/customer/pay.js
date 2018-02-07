var async = require('asyncawait/async');
var await = require('asyncawait/await');
var good=require('../../modules/good.js');
var user=require('../../modules/user.js');
var order=require('../../modules/order.js');
var subOrder=require('../../modules/subOrder.js');
var label=require('../../modules/label.js');
var desk=require('../../modules/desk.js');
var request = require('request');
var Sequelize=require('sequelize')
var crypto = require('crypto')
var parseString = require('xml2js').parseString;
module.exports=(async (function(method,req,response){
	response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});//设置respons
	var result={
		status:-1,
		msg:"登录异常,请关闭页面重新进入"
	}
	if(method=='get'){
		
	}
	else if(method=='post'){
		var cid=req.session.cid;
		var orderId=req.body.orderId
		var shopId=req.body.shopId
		if(cid){
			order.hasMany(subOrder)
			subOrder.belongsTo(order);
			desk.hasOne(order)
			order.belongsTo(desk);
			good.hasOne(subOrder)
			subOrder.belongsTo(good);
			good.hasMany(label)
			label.belongsTo(good);
			var shopRes=await(user.findOne({
				where:{
					id:shopId
				}
			}))
			if(shopRes&&shopRes.dataValues.openBusiness==0){
				//店铺没有开启营业不可支付
				result.status=-1
				result.msg='该店铺已停止营业，不可支付'
				response.end(JSON.stringify(result))
			}else{
				//查询该订单详情
				var orderRes=await(order.findOne({
					where:{
						id:orderId
					}
				}))
				if(orderRes.dataValues.status==1){
					//订单为待支付状态
					var ip=req.headers['x-forwarded-for']||req.connection.remoteAddress||req.socket.remoteAddress
					//微信统一下单参数和签名
					var appid="wxa9c22df153e7dd7b"
					var body="魏记小店-日用杂货"
					var mch_id="1497990382"
					var nonce_str="abcdefg"
					var notify_url="http://www.yslpartition.com/customer/payCallBack"
					var openid=cid
					var out_trade_no=orderId
					var spbill_create_ip=ip.replace("::ffff:","")
					var total_fee=parseInt(orderRes.dataValues.count*100)
					var trade_type='JSAPI'
					var key='weijixiaodian666weijixiaodian666'
					var stringA=`appid=${appid}&body=${body}&mch_id=${mch_id}&nonce_str=${nonce_str}&notify_url=${notify_url}&openid=${openid}&out_trade_no=${out_trade_no}&spbill_create_ip=${spbill_create_ip}&total_fee=${total_fee}&trade_type=${trade_type}&key=${key}`
					var md5 = crypto.createHash('md5');
					var sign=md5.update(stringA).digest('hex');
					sign=sign.toUpperCase()
					var xml=`<xml>
						<appid>${appid}</appid>
						<body>${body}</body>
						<mch_id>${mch_id}</mch_id>
						<nonce_str>${nonce_str}</nonce_str>
						<notify_url>${notify_url}</notify_url>
						<openid>${openid}</openid>
						<out_trade_no>${out_trade_no}</out_trade_no>
						<spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
						<total_fee>${total_fee}</total_fee>
						<trade_type>${trade_type}</trade_type>
						<sign>${sign}</sign>
					</xml>`
					//微信统一下单
					request.post({
						url:'https://api.mch.weixin.qq.com/pay/unifiedorder',
						headers:{
							"Content-type":"text/xml;charset=UTF-8"
						},
						body:xml
					},function(error,res1,body1){
						parseString(body1, function (err, result2) {
						    body1 = result2.xml;
							if(body1.return_code[0]=='SUCCESS'&&body1.result_code[0]=='SUCCESS'){
								//统一下单成功
								let timestamp=new Date().valueOf()
								let nonceStr='abcdefg'
								let prepay_id='prepay_id='+body1.prepay_id[0]
								let signType='MD5'
								let stringB=`appId=wxa9c22df153e7dd7b&nonceStr=${nonceStr}&package=${prepay_id}&signType=${signType}&timeStamp=${timestamp}&key=weijixiaodian666weijixiaodian666`
								let md5 = crypto.createHash('md5');
								let paySign=md5.update(stringB).digest('hex');
								paySign=paySign.toUpperCase()
								order.update({
									paySign:paySign,
									prepayId:body1.prepay_id[0]
								},{
									where:{
										id:orderId
									}
								})
								result.status=0
								result.msg=body1.return_msg[0]
								result.data={
									timestamp:timestamp,
									nonceStr:nonceStr,
									package:prepay_id,
									signType:signType,
									paySign:paySign
								}
								response.end(JSON.stringify(result))
							}else{
								result.status=-2
								result.msg=body1.err_code_des[0]
								response.end(JSON.stringify(result))
							}
							
						});
						
					})
					// var payRes=await(order.update({
					// 	status:2,
					// 	isPay:1
					// },{
					// 	where:{
					// 		id:orderId
					// 	}
					// }))
					// if(payRes){
					// 	//支付成功后向后台推送订单
					// 	orderRes.dataValues.status=2;
					// 	if(global.sockets[shopId]){
					// 		global.sockets[shopId].emit('postOrder',orderRes)
					// 	}
					// 	result.status=0
					// 	result.msg='支付成功'
					// }
				}else{
					result.status=-2
					result.msg='支付异常'
					response.end(JSON.stringify(result))
				}
			}
		}else{
			response.end(JSON.stringify(result))
		}
	}
	// response.end(JSON.stringify(result))
	
}))