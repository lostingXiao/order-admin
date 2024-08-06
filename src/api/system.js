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

// 权限全部列表
export const authAll=()=> {
  return request({
    url: http + '/admin/system/authAll',
    method: 'GET',
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

// 角色列表
export const roleList=(data)=> {
  return request({
    url: http + '/admin/system/roleList',
    method: 'POST',
    data
  })
}

// 角色列表
export const addRole=(data)=> {
  return request({
    url: http + '/admin/system/addRole',
    method: 'POST',
    data
  })
}

// 角色全部列表
export const roleAll=()=> {
  return request({
    url: http + '/admin/system/roleAll',
    method: 'GET',
  })
}



// 用户列表
export const userList=(data)=> {
  return request({
    url: http + '/admin/system/userList',
    method: 'POST',
    data
  })
}








