import request from '../utils/request'
const http = '/api/public/admin'


// 图片上传
export const uploadImg = http + '/uploadImg'

// 登录
export const login=(data)=> {
  return request({
    url: http + '/login',
    method: 'POST',
    data
  })
}

