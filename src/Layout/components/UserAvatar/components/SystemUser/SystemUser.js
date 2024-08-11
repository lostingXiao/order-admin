import React , { useEffect, useState } from 'react'
import style from './SystemUser.module.scss'
import { Avatar, Space,Flex,Button,Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../../store';
import { shopAll } from '../../../../../api/business';

function SystemUser() {
  const { user } = useStore()
  const { username,roleName,setSates } = user
  const [ shopOptions, setShopOptions ] =useState([])
  const [ value, setValue ] = useState(null)
  
  const getShopList = async()=>{
    const res = await shopAll()
    if(res.list.length){
      setShopOptions(res.list)

      shopChange(res.list[0].id,res.list[0])
    }
  }
  const shopChange=(value,option)=>{
    const { id:shopId,name: shopName,logo_url:shopLogo } = option
    setValue(value)
    setSates({shopId,shopName,shopLogo})
  }

  useEffect(()=>{
    //获取店铺列表
    getShopList()
  },[])

  return (
    <div className={style.user}>
      <Space className={ style.userMgs }> 
          <Space.Compact className={style.userMgs} direction="vertical">
            <span className={style.text}>{ username||'管路员1'}</span>
            <span className={style.text}>{ roleName||'系统管理员'}</span>
          </Space.Compact>
          <Select 
            value={value} 
            fieldNames={{label:'name',value:'id'}} 
            className={style.selectShop} 
            onChange={shopChange}
            options={shopOptions}>
          </Select>
        </Space>
    </div>
  )
}

export default observer(SystemUser)