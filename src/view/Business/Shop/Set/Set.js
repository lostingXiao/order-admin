import React, { useState, useEffect } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import ShopForm from '../../components/ShopForm/ShopForm'
import { useParams,useLocation,useNavigate } from 'react-router-dom'
import { addShop,shopDetail,editShop } from '../../../../api/business'

export default function Set() {
  const navigate=useNavigate()
  const [initialValues,setInitialValues]=useState({})
  const [ initFileList, setInitFileList ] = useState([])
  const { type } = useParams()
  const { state } = useLocation()
  const shopId = state.id

  const onFinish = async (values) => {
    const { logoUrl:logo,...rest } = values
    const logoUrl = typeof logo ==='string' ? logo : logo[0].response.data.url
    const params ={ logoUrl,...rest }
    const res = await shopId ? editShop(params) : addShop(params)
    navigate(-1)
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
    }
  }

  const onRest = ()=>{
    setInitFileList([])
  }

  const init=()=>{
    if(type!=='add'){
      getShopConfig()
    }
  }

  useEffect(()=>{
    init()
  },[])

  return (
    <div className={style.set}>
      <SetForm 
        title={type==='add'?'新建':type==='edit'?'编辑':'详情'} 
        initialValues={initialValues} 
        onFinish={onFinish}
        onRest={onRest}
        disabled={type==='detail'} >
        <ShopForm initFileList={initFileList}></ShopForm>
      </SetForm>
    </div>
  )
}