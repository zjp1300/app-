import axios from 'axios'
import qs from 'qs'
import {getToken} from './auth'
// 全局配置
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
axios.defaults.baseURL='http://39.105.151.217:5588'
axios.defaults.headers.common["Authorization"]=getToken()

export function post(url,data){
  return axios({
    method:'post',
    url,
    data:qs.stringify(data),
    timeout:10000,
    headers:{
      'X-Requested-With': 'XMLHttpRequest',
    }

  }) 
  };
  export function post_json(url,data){
    return axios({
      method:'post',
      url,
      data,
      timeout:10000,
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
  
    }) 
    };
  export function post_Array(url,data){
    return axios({
      method:'post',
      url,
      data:qs.stringify(data,{arrayFormat:"repeat"}),
      timeout:10000,
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
    }
    })
  };
  export function get(url,params){
    return axios({
      method:'get',
      url,
      params,//get请求时带的参数 必须是一个无格式对象(plain object)
      timeout:10000,
      headers:{
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/json'
    }

    })
  }


// 配置请求拦截
// axios.interceptors.request.use(function (config) {
//     //手动将参数转为查询字符串，为了响应设置Content-type
//     if(config.method==='post'){
//       config.data=qs.stringify(config.data);
//     }
//     return config
//   }, function (error) {
//     return Promise.reject(error);
//   });


axios.interceptors.response.use(function (response) {
  // 把响应数据封装到response中
    let {data}=response;
    response.data=data.data;
    response.statusText=data.message;
    response.status=data.status;
    
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default axios;