import React from 'react'
import style from './Table.module.scss'
import * as htmlToImage from 'html-to-image';
import { MinusCircleOutlined, PlusOutlined,DownloadOutlined } from '@ant-design/icons'
import { Col,Tooltip, Row,Card,Flex,Form,Input,Space,Button,InputNumber,QRCode,Switch,ColorPicker } from 'antd'
import logo from '../../../logo.svg'

export default function Table() {
  const [form] = Form.useForm();

  const makeQRCode = (name) => {
    const { users }=form.getFieldsValue()
    const tableName = users[name]&&users[name].name?users[name].name:name
    const sizeCM = users[name]&&users[name].size?users[name].size:8
    const size = sizeCM * 25;
    const iconSize =size/4
    const icon = users[name]&&users[name].icon?logo:''
    const color = users[name]&&users[name].color?users[name].color:'#1677ff'
    const bgColor = users[name]&&users[name].bgColor?users[name].bgColor:'#ffffff'
    return (
      <div id={`qrcode${name}`} className={style.qrcode}>
        <QRCode
          errorLevel="H"
          value=" "
          size={size}
          iconSize={iconSize}
          icon={icon}
          color={(typeof color)==='string'?color:color.toHexString()}
          bgColor={(typeof bgColor)==='string'?bgColor:bgColor.toHexString()}
        />
        <span className={style.qrcodeName}>{tableName}</span>
      </div>
    )
  }

  const loadQRCode=(name)=>{
    var node = document.getElementById(`qrcode${name}`);
    htmlToImage.toPng(node).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = `qrcode${name+1}.png`;
      link.href = dataUrl;
      link.click();
    });
  }

  const saveItem = ()=>{
    form.validateFields(['users', 0,'seat']).then(res => {
      console.log(res)
      // console.log(values.users[index].firstName, values.users[index].lastName)
    })
  }

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  return (
    <Form onFinish={onFinish} form={form} className={style.form}>
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              <Row className={style.handle}>
                <Space size={[8, 16]}> 
                  <Button type="primary" htmlType="submit" > 全部保存 </Button>
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}> 添加餐桌 </Button>
                </Space>
              </Row>
              <Space size={[8, 16]} wrap className={style.space}>
                {fields.map(({ key, name, ...restField }) => (
                  <Card 
                    hoverable 
                    title={name+1} 
                    extra={
                      <Space>
                        <Button size='small' type="link" onClick={() => remove(name)}><MinusCircleOutlined /> 删除</Button>
                        {/* <Button size='small' type="link" onClick={() => loadQRCode(name)} ><DownloadOutlined />下载二维码</Button> */}
                      </Space>
                    } 
                    actions={[
                      <Tooltip title="保存后可下载二维码" color="blue" >
                        <Button size='small' type="link" disabled onClick={() => loadQRCode(name)} ><DownloadOutlined />下载二维码</Button>
                      </Tooltip>,
                      <Button size='small' type="link" onClick={() => saveItem(name) } >保存</Button>,
                    ]}>
                    <Form.Item label='餐桌名称' name={[name, 'name']} initialValue={`${name+1}号桌`} rules={[ { required: true,message: 'Missing first name' },]}>
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item label='座位数' name={[name, 'seat']} rules={[{ required: true, message: '请填写座位数'}]}>
                      <InputNumber placeholder="座位数" addonAfter="座" className={style.seat}/>
                    </Form.Item>
                    <Flex justify='space-between' gap="middle">
                      <Space> 
                        <Form.Item shouldUpdate className={style.qrcodeitem}>
                          {() => {
                            return makeQRCode(name)
                          }}
                        </Form.Item>
                      </Space>
                      <Flex vertical='vertical'>
                        <Form.Item label="icon" initialValue='checked' name={[name, 'icon']}>
                          <Switch />
                        </Form.Item>
                        <Form.Item initialValue={8} label="大小" shouldUpdate name={[name, 'size']}>
                          <InputNumber min={6} max={10} addonAfter="cm" className={style.inputnumber} />
                        </Form.Item>
                        <Form.Item initialValue='#000000' label="颜色" shouldUpdate name={[name, 'color']}>
                          <ColorPicker showText />
                        </Form.Item>
                        <Form.Item initialValue='#ffffff' label="背景色" shouldUpdate name={[name, 'bgColor']}>
                          <ColorPicker showText />
                        </Form.Item>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
                {/* <Card className={`${style.item} ${style.handleItem}`}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}> 添加餐桌 </Button>
                </Card> */}
              </Space>
            </>
          )}
          
        </Form.List>
        
    </Form>
  )
}