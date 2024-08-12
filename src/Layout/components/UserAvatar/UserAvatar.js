import React,{ useEffect, useState } from 'react'
import style from './UserAvatar.module.scss'
import { Avatar, Space,Flex,Button,Select } from 'antd';
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../store'
import { UserOutlined } from '@ant-design/icons';
import Permission from '../../../components/Permission/Permission';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SystemUser from './components/SystemUser/SystemUser'
import { getUserInfo } from '../../../api/system'

function UserAvatar() {
  const navigate = useNavigate()
  const { user } = useStore()
  const { clearSates,shopLogo,shopName,setSates } = user
 
  const logout = ()=>{
    clearSates()
    navigate('/login')
  }

  const setUserInfo =  async () => {
    const res = await getUserInfo()
    console.log(res);
    const { username, phone, shop_id:shopId, role_name:roleName, shop_name:shopName, shop_logo_url:shopLogo } = res
    setSates({ username, phone, shopId, roleName, shopName, shopLogo })
    navigate('/')
  }

  useEffect(()=>{
    setUserInfo()
  },[])

  return (
    <div className={style.useravatar}>
      <div className={ style.shopMgs}>
        <Avatar size="large" icon={!shopLogo && <UserOutlined />} src={shopLogo} />
        <span> 你好！ { shopName }</span>
      </div>
      <div className={style.sysMgs}>
        <Permission code='07539d984e6e27fc'>
          <SystemUser />
        </Permission>
        <Button type="link" icon={<LogoutOutlined />} onClick={logout}> 退出登录</Button>
      </div>
    </div>
  )
}

export default observer(UserAvatar)