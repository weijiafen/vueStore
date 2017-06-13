import * as types from './editTableTypes.js'
import axios from 'axios'

export const editTable_mutations={
    [types.FETCH_TOPICS_SUC](state,action){
        state.isFetching=false
        state.data=action.data
    },
    [types.FETCH_TOPICS_REQ](state){

    },
    [types.FETCH_TOPICS_ERR](state,action){

        state.error=action.error
    }
}

export const editTable_action={
    fetchAccountEnable({commit,state},params){
        commit(types.FETCH_TOPICS_REQ)

        axios({
            method:'get',
            url:'#',
            params:{
                //
            }
        }).then((res)=>{
            let data=res.data.data;
            commit(types.FETCH_TOPICS_SUC,{
                data
            })
        }).catch((error)=>{
            commit(types.FETCH_TOPICS_ERR,{
                error
            });
            console.log(error)
        })
    }
}
