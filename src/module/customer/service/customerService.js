import api from '../lib/axios/api';
const Service = {
    sendWXCode:(code)=>{
        return api
            .post('/customer/wxCode', {
                data: {
                    code:code
                },
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    getSignature:(nonceStr,timestamp,url)=>{
        return api.get('/customer/getSignature',{
            params:{
                nonceStr:nonceStr,
                timestamp:timestamp,
                url:url
            }
        }).then((res)=>{
        return res
        },(error)=>{
            throw error
        })
    },
    getGoods:(shopId)=>{
        return api.get('/customer/menu',{
			params:{
				shopId:shopId
			}
		}).then((res)=>{
        return res
        },(error)=>{
            throw error
        })
    },
    getOrder:(orderId)=>{
        return api.get('/customer/order',{
            params:{
                orderId:orderId
            }
        }).then((res)=>{
        return res
        },(error)=>{
            throw error
        })
    },
    applyOrder:(data)=>{
        return api
            .post('/customer/order', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    payOrder:(data)=>{
        return api
            .post('/customer/pay', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    getOrderList:(shopId)=>{
        return api.get('/customer/orderList',{
            params:{
                shopId:shopId
            }
        }).then((res)=>{
        return res
        },(error)=>{
            throw error
        })
    },
}
export default Service