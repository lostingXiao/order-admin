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
// 添加店铺
export const shopList=(data)=> {
  return request({
    url: http + '/shopList',
    method: 'POST',
    data
  })
}

