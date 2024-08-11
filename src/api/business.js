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

// 所有店铺列表
export const shopAll=(data)=> {
  return request({
    url: http + '/shopAll',
    method: 'GET',
    data
  })
}

export const shopDetail=(data)=> {
  return request({
    url: http + '/shopDetail',
    method: 'POST',
    data
  })
}

export const editShop=(data)=> {
  return request({
    url: http + '/editShop',
    method: 'POST',
    data
  })
}





