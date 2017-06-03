import axios from 'axios';
import NProgress from 'nprogress';
// import _ from 'underscore'
import { redirect } from '../util/function';
// import 'babel-polyfill';

const NETWORK_ERROR_MESSAGE = '网络异常';
const SERVER_ERROR_MESSAGE = '系统异常';
const UNEXPETED_STATUS = 1;
const EXPETED_STATUS = -1;
const UNLOGIN_STATUS = 1000;
const SUCCESS_STATUS = 0;
const COMMON_STATUS = 10000;

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 5,
  transformRequest: [(data) => {
    NProgress.start();
    if (!data) {
      return '';
    }
    return JSON.stringify(data.data);
  }],
  transformResponse: [(data) => {
    NProgress.done();
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // alert('亲，网站数据是静态的，可能没有这页的数据，要不你点其他地方试试？');
        alert('服务器异常,请重试!');
      }
    }
    return data;
  }],
});

api.interceptors.response.use(
  (response) => {
    const status = typeof response.data.status !== 'undefined' ? response.data.status : UNEXPETED_STATUS;
    if (typeof status !== 'number' || status !== SUCCESS_STATUS) {
      if (status === UNLOGIN_STATUS) {
        alert('登录信息已失效，请重新登录');
        return redirect();
        
      }
      if(status===EXPETED_STATUS){
        //预期内的status  -1
        return response.data
      }
      if (status < COMMON_STATUS) {
        alert(response.data.msg || SERVER_ERROR_MESSAGE);
      }
      const newData = {
        msg: SERVER_ERROR_MESSAGE,
        status: UNEXPETED_STATUS
      }
      return Promise.reject(newData);
    }
    return response.data || {};
  },
  (err) => {
    console.log('111',err.stack)
    return Promise.reject({
      msg: NETWORK_ERROR_MESSAGE,
      status: UNEXPETED_STATUS,
    });
  }
);

export default api;
