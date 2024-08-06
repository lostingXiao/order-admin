import React,{useState} from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './ShopForm.module.scss'
import { Button, Checkbox, Form, Input, Space,Upload,message } from 'antd'

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function ShopForm() {
  const [initialValues,setInitialValues]=useState({})
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState();


  const uploadButton = (
    <button style={{ border: 0, background: 'none', }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8,}}>
        Upload
      </div>
    </button>
  )

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={style.shopform}>
      <Form 
        labelCol={{ span: 4 }} 
        wrapperCol={{ span: 20 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="店铺名称"
            name="name"
            rules={[{ required: true, message: '请输入店铺名称' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="店铺LOGO"
            name="logoUrl"
            rules={[{ required: true, message: '请上传店铺LOGO' }]}
            >
            <Upload
              name="avatar"
              maxCount={1}
              listType="picture-card"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? ( <img src={imageUrl} alt="avatar" style={{ width: '100%'}} /> ) : ( uploadButton)}
            </Upload>
          </Form.Item>
          <Form.Item
            label="店铺联系人"
            name="contact_person"
            rules={[{ required: true, message: '请输入店铺联系人' }]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系人电话"
            name="contact_phone"
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
              <Button htmlType="submit"> 重置 </Button>
            </Space>
          </Form.Item>
        </Form>
    </div>
  )
}

