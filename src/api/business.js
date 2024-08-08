import request from '../utils/request'
const http = '/api/admin/business'

// 添加店铺
export const addShop=(data)=> {
  return request({
    url: http + '/addShop',
    method: 'POST',
    data
  })
}
// 添加列表
export const shopList=(data)=> {
  return request({
    url: http + '/shopList',
    method: 'POST',
    data
  })
}

// 添加列表
export const shopAll=(data)=> {
  return request({
    url: http + '/shopAll',
    method: 'GET',
    data
  })
}


