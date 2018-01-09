import api from '../lib/axios/api';
const Service = {
    getOrderList:()=>{
        return api.get('/manager/orderList',{
            params:{
            }
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