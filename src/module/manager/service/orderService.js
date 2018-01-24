import api from '../lib/axios/api';
const Service = {
    getOrderList:(data)=>{
        return api.get('/manager/orderList',{
            params:data
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getGoodReport:(data)=>{
        return api.get('/manager/goodReport',{
            params:data
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getSaleReport:(data)=>{
        return api.get('/manager/saleReport',{
            params:data
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    putOrder:(data)=>{
        return api
            .put('/manager/order', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    postOrder:(data)=>{
        return api
            .post('/manager/order', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
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
    
}
export default Service