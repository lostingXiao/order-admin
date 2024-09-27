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

//商品类型

export const goodsTypesList=(data)=> {
  return request({
    url: http + '/goodsTypesList',
    method: 'POST',
    data
  })
}

export const addGoodsType=(data)=> {
  return request({
    url: http + '/addGoodsType',
    method: 'POST',
    data
  })
}
export const goodsTypeDetail=(data)=> {
  return request({
    url: http + '/goodsTypeDetail',
    method: 'POST',
    data
  })
}
export const editGoodsType=(data)=> {
  return request({
    url: http + '/editGoodsType',
    method: 'POST',
    data
  })
}
export const shopGoodsTypes=(data)=> {
  return request({
    url: http + '/shopGoodsTypes',
    method: 'POST',
    data
  })
}

// 餐桌二维码
export const addTableQrcode=(data)=> {
  return request({
    url: http + '/addTableQrcode',
    method: 'POST',
    data
  })
}
export const tableQrcodesList=(data)=> {
  return request({
    url: http + '/tableQrcodesList',
    method: 'POST',
    data
  })
}
export const editTableQrcode=(data)=> {
  return request({
    url: http + '/editTableQrcode',
    method: 'POST',
    data
  })
}
export const batchTableQrcode=(data)=> {
  return request({
    url: http + '/batchTableQrcode',
    method: 'POST',
    data
  })
}
export const tableQrcodeUrl=(data)=> {
  return request({
    url: http + '/tableQrcodeUrl',
    method: 'POST',
    data
  })
}


















