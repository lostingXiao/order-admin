import React, { useEffect, useState } from 'react'
import style from './Set.module.scss'
import SetForm from '../../../../components/SetForm/SetForm'
import { Select, Form, Input, InputNumber,Switch } from 'antd'
import { useParams,useLocation, useNavigate } from 'react-router-dom'
import UploadImg from '../../../../components/UploadImg/UploadImg'
import { addGoods,goodsDetail,editGoods,shopGoodsTypes } from '../../../../api/business'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store';

function Set() {
  const navigate = useNavigate()
  const [initialValues,setInitialValues]=useState({})
  const [ initFileList, setInitFileList ] = useState([])
  const { type } = useParams()
  const { state } = useLocation()
  const { user } = useStore()
  const { shopId } = user
  const goodsId = state.id

  const [typeOptions,setTypeOptions]=useState([
    { value: '1', label: 'Jack' },
    { value: '2', label: 'Lucy' },
    { value: '3', label: 'Tom' },
  ])
  

  const onFinish = async (values) => {
    const { state:se,img:ig,...rest } = values
    const img = typeof ig === 'string' ? ig : ig[0].response.data.url
    const state = se ? 1 : 0
    const params = {...rest,shopId,goodsId,state,img}
    goodsId ? await editGoods(params) : await addGoods(params)
    navigate('/business/businessGoods/businessGoodsList')
  }
  
  const onRest= ()=>{

  }

  const getGoodsDetail = async ()=>{
    if(goodsId){
      const res = await goodsDetail({id:goodsId})
      const { 
        id,
        name,
        description,
        img,
        price,
        typeId,
        state:se,
        min_quantity:minQuantity,
      } = res
      const state = se===1 
      setInitialValues({id,name,description,img,typeId,price,state,minQuantity})
      setInitFileList([{url:img}])
    }
  }

  const getTypeOptions = async ()=>{
    const res = await shopGoodsTypes({shopId})
    const list = res.list.map(item=>({label:item.name,value:item.id}))
    setTypeOptions(list)
  }


  const init=()=>{
    getTypeOptions()
    if(type!=='add'){
      getGoodsDetail()
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
        onRest={ onRest }
        labelCol={{ span: 6 }} 
        disabled={type==='detail'} >
        <Form.Item
          label="商品名称"
          name="name"
          rules={[{ required: true, message: '请输入商品名称!' }]}
          >
          <Input showCount maxLength={10} />
        </Form.Item>
        <Form.Item
          label="商品图片"
          name="img"
          rules={[{ required: true, message: '请上传商品图片!' }]}
          >
          <UploadImg maxCount={1} initFileList={initFileList} />
        </Form.Item>
        <Form.Item
          label="最小销售数量"
          name="minQuantity"
          initialValue={1}
          rules={[{ required: true, message: '请输入最小销售数量!' }]}
          >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="单价"
          name="price"
          rules={[{ required: true, message: '请输入单价!' }]}
          >
          <InputNumber min={0} addonAfter='元' />
        </Form.Item>
        <Form.Item
          label="是否上架"
          name="state"
          valuePropName="checked"
          initialValue={true}
          rules={[{ required: true, message: '请选择商品状态!' }]}
          >
          <Switch checkedChildren="上架" unCheckedChildren="下架" />
        </Form.Item>
        <Form.Item
          label="商品类型"
          name="typeId"
          rules={[{ required: true, message: '请选择商品类型!' }]}
          >
          <Select
            showSearch
            placeholder="请选择商品类型"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={typeOptions}
          />
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

export default observer(Set)