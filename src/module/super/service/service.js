import api from '../lib/axios/api';
const Service = {
	login: (detail) => {
        return api
            .post('/super/login', {
                data: detail,
            })
            .then((res) => {
                return res;
            }, (error) => {
                console.log('error ', error);
                throw error;
            });
    },
    getCount:(data)=>{
        return api.get('/super/getCount',{
            params:{
                startDate:data.startDate,
                endDate:data.endDate,
                page:data.page,
                pageSize:data.pageSize,
            }
        }).then((res)=>{
            return res
        },(error)=>{
            throw error
        })
    },
    putSetting:(data)=>{
        return api
            .put('/manager/setting', {
                data: data,
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
    },
    getBusiness:(data)=>{
            return api.get('/manager/openBusiness',{
                params:{
                }
            }).then((res)=>{
                return res
            },(error)=>{
                throw error
            })
    },
    putBusiness:(data)=>{
        return api
            .put('/manager/openBusiness', {
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