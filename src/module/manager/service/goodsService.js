import api from '../lib/axios/api';
const Service = {
    getGoods:(page = 1 , pageSize = 10)=>{
        return api.get('/shop/goods',{
            params:{
                page:page,
                pageSize:pageSize
            }
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteGoods:(id)=>{
        return api.delete('/manager/goods',{
            params:{id:id}
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    addGoods:(data)=>{
        return api
            .post('/manager/goods', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    setGoods:(data)=>{
        return api
            .put('/manager/goods', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    deleteTag:(id)=>{
        return api.delete('/manager/tags',{
            params:{id:id}
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    }
}
export default Service