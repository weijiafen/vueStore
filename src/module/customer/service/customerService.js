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
}
export default Service