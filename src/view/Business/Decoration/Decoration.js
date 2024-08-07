import React,{ useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import style from './Decoration.module.scss'
import { Col, Row,Upload,Image,Form,Select,Button,Space,Card,Flex,Input } from 'antd'

export default function Decoration() {

  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  return (
    <div className={style.decoration}>
      <Row justify="start" gutter={[16]}>
        <Col span={8} >
          <div className={style.item}>
            <div className={style.preview}>
              首页预览
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className={style.item}>
            <Form name="basic" 
              labelCol={{ span: 4,}} 
              wrapperCol={{ span: 20, }} 
              // initialValues={}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed} 
              className={style.config}
            >
              <Form.Item label="首页轮播图" valuePropName="fileList">
                <Upload 
                  multiple
                  maxCount={10}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  <button style={{ border: 0, background: 'none', }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8, }}> Upload </div>
                  </button>
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: 'none',
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
              <Form.Item label="首页轮播图" valuePropName="fileList">
              <Select
                mode='multiple'
                maxCount={9}
                placeholder="Select a option and change input text above"
                allowClear
              >
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
                <Select.Option value="other">other</Select.Option>
                <Select.Option value="male1">male</Select.Option>
                <Select.Option value="female2">female</Select.Option>
                <Select.Option value="other3">other</Select.Option>
                <Select.Option value="male4">male</Select.Option>
                <Select.Option value="femal5e">female</Select.Option>
                <Select.Option value="other6">other</Select.Option>
                <Select.Option value="mal7e">male</Select.Option>
                <Select.Option value="fem8ale">female</Select.Option>
                <Select.Option value="othebr">other</Select.Option>
              </Select>
              </Form.Item>
              <Form.List name="links">
                {(fields, { add, remove }) => (
                  <Flex wrap gap="large">
                    {fields.map(({ key, name, ...restField }) => (
                      <Card 
                        hoverable 
                        title={name+1} 
                        extra={
                          <Space>
                            <Button size='small' type="link" onClick={() => remove(name)}>删除</Button>
                          </Space>
                        } 
                        className={style.linkItem}>
                          <Form.Item label='icon图标' name={[name, 'img']} labelCol={{span: 6}}>
                            <Upload 
                              multiple
                              maxCount={1}
                              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                              listType="picture-card"
                              // fileList={fileList}
                              // onPreview={handlePreview}
                              // onChange={handleChange}
                            >
                              <button style={{ border: 0, background: 'none', }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8, }}> Upload </div>
                              </button>
                            </Upload>
                          </Form.Item>
                          <Form.Item label='标题' name={[name, 'text']} labelCol={{span: 6}}>
                            <Input></Input>
                          </Form.Item>
                      </Card>
                    ))}
                    {fields.length<4&&<Button type="dashed" onClick={() => add()} block> add </Button>}
                  </Flex>
                )}
              </Form.List>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}