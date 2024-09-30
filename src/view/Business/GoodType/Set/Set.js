import React, { useState, useEffect } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { useParams,useLocation,useNavigate } from 'react-router-dom'
import { addGoodsType, goodsTypeDetail, editGoodsType } from '../../../../api/business'

import { Button, Checkbox, Form, Input, Space,Upload,InputNumber,Switch } from 'antd'
import { useStore } from '../../../../store';

export default function Set() {
  const navigate=useNavigate()
  const [initialValues,setInitialValues]=useState({})
  const [ initFileList, setInitFileList ] = useState([])
  const { type } = useParams()
  
  const { user } = useStore()
  const { shopId } = user
  const { state } = useLocation()
  const typesId = state.id

  const onFinish = async (values) => {
    console.log(values)
    const params = { ...values,shopId,id:typesId }
    console.log(params)
    const res = typesId ? await editGoodsType(params) : await addGoodsType(params)
    navigate(`/business/businessGoodType/businessGoodTypeList`)
  }

  const getGoodTypeDetail = async ()=>{
    if(typesId){
      const res = await goodsTypeDetail({id:typesId})
      const { id, name, description='' } = res
      setInitialValues({ id, name, description })
    }
  }

  const onRest = ()=>{
    setInitFileList([])
  }

  const init=()=>{
    if(type!=='add'){
      getGoodTypeDetail()
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
        <Form.Item
          label="类型名称"
          name="name"
          rules={[{ required: true, message: '请输入类型名称!' }]}
          >
          <Input showCount maxLength={10} />
        </Form.Item>
        <Form.Item
          label="商品描述"
          name="description"
          >
          <Input.TextArea showCount maxLength={20} rows={2} />
        </Form.Item>
      </SetForm>
    </div>
  )
}