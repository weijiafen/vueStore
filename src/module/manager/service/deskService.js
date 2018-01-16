import api from '../lib/axios/api';
const Service = {
    getDesks:()=>{
        return api.get('/manager/desk').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    deleteDesk:(id)=>{
        return api.delete('/manager/desk',{
            params:{id:id}
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    setDesk:(data)=>{
        return api
            .post('/manager/desk', {
                data: data,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    modifyDesk:(data)=>{
        return api
            .put('/manager/desk', {
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