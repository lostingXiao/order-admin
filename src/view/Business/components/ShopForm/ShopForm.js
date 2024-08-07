import React,{useState} from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './ShopForm.module.scss'
import { Button, Checkbox, Form, Input, Space,Upload,message } from 'antd'
import UploadImg from '../../../../components/UploadImg/UploadImg'
import { addShop } from '../../../../api/business'


export default function ShopForm() {
  const [form] = Form.useForm();
  const [initialValues,setInitialValues]=useState({})

  const onFinish = async (values) => {
    console.log('Success:', values);
    const { logoUrl:logo,...rest } = values

    const logoUrl = logo[0].response.data.url
    const params ={ logoUrl,...rest }
    const res = await addShop(params)

  }

  return (
    <div className={style.shopform}>
      <Form 
        form={form}
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
        onFinish={onFinish}
        >
          <Form.Item
            label="店铺名称"
            name="name"
            rules={[{ required: true, message: '请输入店铺名称' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item label="店铺LOGO" name="logoUrl" rules={[{ required: true, message: '请上传店铺LOGO' }]} >
            <UploadImg maxCount={1}/>
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
          <Form.Item
            label="简介"
            name="description"
            >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }} >
            <Space>
              <Button type="primary" htmlType="submit"> 提交 </Button>
              <Button onClick={()=>form.resetFields()}> 重置 </Button>
            </Space>
          </Form.Item>
        </Form>
    </div>
  )
}

