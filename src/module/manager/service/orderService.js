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
    
}
export default Service