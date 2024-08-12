import React, { useState, useEffect } from 'react'
import style from './Mine.module.scss'
import ShopForm from '../components/ShopForm/ShopForm'
import SetForm from '../../../components/SetForm/SetForm'
import { addShop,shopDetail,editShop } from '../../../api/business'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../store'
import { message } from 'antd'

function Mine() {

  const { user } = useStore()
  const { shopId } = user

  console.log(shopId)
  
  const [ initialValues,setInitialValues ] = useState({})
  const [ initFileList, setInitFileList ] = useState([])


  const onFinish = async (values) => {
    const { logoUrl:logo,...rest } = values
    const logoUrl = typeof logo ==='string' ? logo : logo[0].response.data.url
    const params ={ logoUrl,...rest }
    const res = await shopId ? editShop(params) : addShop(params)
  }

  const getShopConfig =async ()=>{
    if(shopId){
      const res = await shopDetail({id:shopId})
      const { 
        id,
        name,
        address,
        description,
        logo_url:logoUrl,
        contact_person:contactPerson,
        contact_phone:contactPhone,
      } = res
      setInitialValues({id,name,address,description,contactPerson,logoUrl,contactPhone})
      setInitFileList([{url:logoUrl}])
    }else{
      message.error('您还没有店铺信息，请先创建店铺！')
    }
  }

  const onRest = ()=>{
    setInitFileList([])
  }

  useEffect(()=>{
    getShopConfig()
  },[shopId])

  return (
    <div className={style.mine}>
      <SetForm 
        initialValues={initialValues} 
        onFinish={onFinish}
        onRest={onRest}>
        <ShopForm initFileList={initFileList}></ShopForm>
      </SetForm>
    </div>
  )
}

export default observer(Mine)