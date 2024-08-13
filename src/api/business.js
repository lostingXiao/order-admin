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

export const addGoods=(data)=> {
  return request({
    url: http + '/addGoods',
    method: 'POST',
    data
  })
}

export const goodsList=(data)=> {
  return request({
    url: http + '/goodsList',
    method: 'POST',
    data
  })
}

export const goodsDetail=(data)=> {
  return request({
    url: http + '/goodsDetail',
    method: 'POST',
    data
  })
}

export const editGoods=(data)=> {
  return request({
    url: http + '/editGoods',
    method: 'POST',
    data
  })
}






