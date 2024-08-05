import request from '../utils/request'
const http = '/api'

// 添加菜单
export const addMenu=(data)=> {
  return request({
    url: http + '/admin/system/addMenu',
    method: 'POST',
    data
  })
}
// 菜单列表
export const menuList=()=> {
  return request({
    url: http + '/admin/system/menuList',
    method: 'GET',
  })
}

// 菜单编辑
export const editMenu=(data)=> {
  return request({
    url: http + '/admin/system/editMenu',
    method: 'POST',
    data
  })
}

// 菜单删除
export const delMenu=(data)=> {
  return request({
    url: http + '/admin/system/delMenu',
    method: 'POST',
    data
  })
}

// 权限列表
export const authList=(data)=> {
  return request({
    url: http + '/admin/system/authList',
    method: 'POST',
    data
  })
}

// 权限列表
export const addAuth=(data)=> {
  return request({
    url: http + '/admin/system/addAuth',
    method: 'POST',
    data
  })
}




