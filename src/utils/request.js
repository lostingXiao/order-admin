import axios from 'axios'
// import { Button, Modal, Space } from 'antd';

const timeStamp = Date.now()
const urlReg = /\/([A-Za-z0-9-_]+)(?=\?|$)/
const appId = 10000001

const service = axios.create({
  withCredentials: false, // 携带cookie, 不支持跨域
  responseType: 'json',
  timeout: 30000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log('Outgoing request:', config);
    // 可以在这里添加token等
    // config.headers.Authorization = `Bearer ${token}`;
    // 可以返回config或者返回一个新的config对象
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service
