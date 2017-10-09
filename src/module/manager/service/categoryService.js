import api from '../lib/axios/api';
const Service = {
    getCategories:()=>{
        return api.get('/shop/categories').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteCategory:(id)=>{
        return api.delete('/shop/categories',{
            params:{id:id}
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setCategory:(data)=>{
        return api
            .post('/shop/categories', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    modifyCategory:(data)=>{
        return api
            .put('/shop/categories', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    }
}
export default Service