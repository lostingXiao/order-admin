import request from '../utils/request'
const http = '/api/admin/system'

// 添加菜单
export const addMenu=(data)=> {
  return request({
    url: http + '/addMenu',
    method: 'POST',
    data
  })
}
// 菜单列表
export const menuList=()=> {
  return request({
    url: http + '/menuList',
    method: 'GET',
  })
}

// 菜单编辑
export const editMenu=(data)=> {
  return request({
    url: http + '/editMenu',
    method: 'POST',
    data
  })
}

// 菜单删除
export const delMenu=(data)=> {
  return request({
    url: http + '/delMenu',
    method: 'POST',
    data
  })
}

// 权限列表
export const authList=(data)=> {
  return request({
    url: http + '/authList',
    method: 'POST',
    data
  })
}

// 权限全部列表
export const authAll=()=> {
  return request({
    url: http + '/authAll',
    method: 'GET',
  })
}

// 权限列表
export const addAuth=(data)=> {
  return request({
    url: http + '/addAuth',
    method: 'POST',
    data
  })
}

// 角色列表
export const roleList=(data)=> {
  return request({
    url: http + '/roleList',
    method: 'POST',
    data
  })
}

// 角色列表
export const addRole=(data)=> {
  return request({
    url: http + '/addRole',
    method: 'POST',
    data
  })
}

// 角色全部列表
export const roleAll=()=> {
  return request({
    url: http + '/roleAll',
    method: 'GET',
  })
}

// 用户列表
export const userList=(data)=> {
  return request({
    url: http + '/userList',
    method: 'POST',
    data
  })
}

// 用户列表
export const addUser=(data)=> {
  return request({
    url: http + '/addUser',
    method: 'POST',
    data
  })
}

// 用户详情
export const getUserInfo=()=> {
  return request({
    url: http + '/getUserInfo',
    method: 'POST',
  })
}

// 角色详情
export const roleDetail=(data)=> {
  return request({
    url: http + '/roleDetail',
    method: 'POST',
    data
  })
}

// 角色详情
export const editRole=(data)=> {
  return request({
    url: http + '/editRole',
    method: 'POST',
    data
  })
}













