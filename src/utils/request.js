import axios from 'axios'
import store from '../store'
import { message } from 'antd';

const timeStamp = Date.now()
const urlReg = /\/([A-Za-z0-9-_]+)(?=\?|$)/
const appId = 10000001

const service = axios.create({
  withCredentials: false, // 携带cookie, 不支持跨域
  responseType: 'json',
  timeout: 30000 // request timeout
})

console.log('store----------')
console.log(store)





// 请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const header = {
      token: store.user.token || '',
    }
    config.data = {
      header,
      body: {
        ...config.data
      }
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log(response.data)
    const { code,message:errMsg  } = response.data
    if(code===0) {
      return response.data
    } else {
      message.success(errMsg)
      return Promise.reject(errMsg)
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service
