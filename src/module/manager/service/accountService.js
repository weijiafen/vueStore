import api from '../lib/axios/api';
const Service = {
	login: (detail) => {
        return api
            .post('/user/login', {
                data: detail,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    getAccounts:()=>{
        return api.get('/manager/accounts').then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    getPassword:(data)=>{
        	return api.get('/manager/password',{
        		params:{
        			id:data.id
        		}
        	}).then((res)=>{
        		return res
        	},(error)=>{
        		throw error
        	})
    },
    RegisterAccount:(data)=>{
        return api.post('/manager/accounts',{
            userName: data.userName,
            account: data.account,
            password: data.password,
            confirmPassword: data.confirmPassword,
            type: data.selectedType
        })
        .then((res)=>{
            return res;
        },(error)=>{
            throw error
        })
    }

}
export default Service