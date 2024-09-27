import axios from 'axios'
import store from '../store'
import { message } from 'antd';

const { setSates } = store.user

const service = axios.create({
  withCredentials: false, // 携带cookie, 不支持跨域
  responseType: 'json',
  timeout: 30000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Token=store.user.token || ''
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
    const { Token } = response.headers
    Token && setSates({token:Token},true)
    if(response.data.code===0) {
      return response.data.data
    } else {
      message.error(response.data.message)
      return Promise.reject(response.data.message)
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service
