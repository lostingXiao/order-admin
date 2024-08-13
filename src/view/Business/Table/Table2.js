import React from 'react'
import style from './Table.module.scss'
import { MinusCircleOutlined, PlusOutlined,DownloadOutlined } from '@ant-design/icons'
import { Form, Card, Button, Space,Input,Row,Col } from 'antd'


export default function Table() {
  const []



  const onFormFinish=(name) => {
    if (name === 'form1') {
      // Do something...
    }
  }

  return (
      <Form.Provider onFormFinish={onFormFinish} >
        <Row className={style.handle}><Button type="primary">保存</Button></Row>
        <Space size={[8, 16]} wrap>
          <Card 
            hoverable 
            title='aa' 
            extra={
              <Space>
                <Button size='small' type="link" onClick={() => {}}><MinusCircleOutlined /> 删除</Button>
                <Button size='small' type="link" onClick={() => {}} ><DownloadOutlined />下载二维码</Button>
              </Space>
            } 
            className={style.item}>
              <Form name="form1">
                <Form.Item label='餐桌名称' name='' rules={[ { required: true,message: 'Missing first name' },]}>
                  <Input placeholder="First Name" />
                </Form.Item>
              </Form>
          </Card>
        
        
        <Card 
          hoverable 
          title='aa' 
          extra={
            <Space>
              <Button size='small' type="link" onClick={() => {}}><MinusCircleOutlined /> 删除</Button>
              <Button size='small' type="link" onClick={() => {}} ><DownloadOutlined />下载二维码</Button>
            </Space>
          } 
          className={style.item}>
          <Form name="form2">
              <Form.Item label='餐桌名称' name='' rules={[ { required: true,message: 'Missing first name' },]}>
                <Input placeholder="First Name" />
              </Form.Item>
          </Form>
        </Card>
        <Card 
          hoverable 
          title='aa' 
          extra={
            <Space>
              <Button size='small' type="link" onClick={() => {}}><MinusCircleOutlined /> 删除</Button>
              <Button size='small' type="link" onClick={() => {}} ><DownloadOutlined />下载二维码</Button>
            </Space>
          } 
          className={style.item}>
          <Form name="form2">
              <Form.Item label='餐桌名称' name='' rules={[ { required: true,message: 'Missing first name' },]}>
                <Input placeholder="First Name" />
              </Form.Item>
          </Form>
        </Card>
        <Card 
          hoverable 
          title='aa' 
          extra={
            <Space>
              <Button size='small' type="link" onClick={() => {}}><MinusCircleOutlined /> 删除</Button>
              <Button size='small' type="link" onClick={() => {}} ><DownloadOutlined />下载二维码</Button>
            </Space>
          } 
          className={style.item}>
          <Form name="form2">
              <Form.Item label='餐桌名称' name='' rules={[ { required: true,message: 'Missing first name' },]}>
                <Input placeholder="First Name" />
              </Form.Item>
          </Form>
        </Card>
      </Space>
      </Form.Provider>
   
  )
}