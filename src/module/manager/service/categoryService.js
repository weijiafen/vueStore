import api from '../lib/axios/api';
const Service = {
    getCategories:()=>{
        return api.get('/manager/categories').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteCategory:(id)=>{
        return api.delete('/manager/categories',{
            params:{id:id}
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setCategory:(data)=>{
        return api
            .post('/manager/categories', {
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
            .put('/manager/categories', {
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