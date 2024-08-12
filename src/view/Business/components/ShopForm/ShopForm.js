import React,{useState,useEffect} from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './ShopForm.module.scss'
import { Button, Checkbox, Form, Input, Space,Upload,message } from 'antd'
import UploadImg from '../../../../components/UploadImg/UploadImg'
import { addShop,shopDetail,editShop } from '../../../../api/business'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store';


function ShopForm({ initFileList }) {
  // const { user } = useStore()
  const [form] = Form.useForm();
  // const { shopId } = user
  // const [ initFileList, setInitFileList ] = useState([])

  // console.log(shopId)

  // const setShopConfig =async ()=>{
  //   if(shopId){
  //     const res = await shopDetail({id:shopId})
  //     const { 
  //       id,
  //       name,
  //       address,
  //       description,
  //       logo_url:logoUrl,
  //       contact_person:contactPerson,
  //       contact_phone:contactPhone,
  //     } = res
  //     form.setFieldsValue({ id,name,address,description,logoUrl,contactPerson,contactPhone })
  //     setInitFileList([{url:logoUrl}])
  //   }else{
  //     message.error('您还没有店铺信息，请先创建店铺！')
  //   }
  // }

  // const onFinish = async () => {
  //   await form.validateFields()
  //   const values = form.getFieldsValue(true)
  //   console.log('Success:', values);
  //   const { logoUrl:logo,...rest } = values
  //   const logoUrl = typeof logo ==='string' ? logo : logo[0].response.data.url
  //   const params ={ logoUrl,...rest }
  //   console.log(params)
  //   const res = await shopId?editShop(params):addShop(params)

  // }

  // const onReset = () => {
  //   form.resetFields()
  //   setInitFileList([])
  // }

  // useEffect(()=>{
  //   setShopConfig()
  // },[shopId])

  return (
    <div className={style.shopform}>
      <Form.Item
        label="店铺名称"
        name="name"
        rules={[{ required: true, message: '请输入店铺名称' }]}
        >
        <Input />
      </Form.Item>
      <Form.Item label="店铺LOGO" name="logoUrl" valuePropName="logoUrl" rules={[{ required: true, message: '请上传店铺LOGO' }]} >
        <UploadImg maxCount={1} initFileList={initFileList} />
      </Form.Item>
      <Form.Item
        label="店铺联系人"
        name="contactPerson"
        rules={[{ required: true, message: '请输入店铺联系人' }]}
        >
        <Input />
      </Form.Item>
      <Form.Item
        label="联系人电话"
        name="contactPhone"
        rules={[{ required: true, message: '请输入联系人电话' }]}
        >
        <Input />
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: '请输入地址' }]}
        >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="简介" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
    </div>
  )
}

export default observer(ShopForm)

