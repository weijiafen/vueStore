import api from '../lib/axios/api';
const Service = {
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
}
export default Service