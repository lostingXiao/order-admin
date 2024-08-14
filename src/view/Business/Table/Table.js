import React, { useState } from 'react'
import style from './Table.module.scss'
import { MinusCircleOutlined, PlusOutlined,DownloadOutlined } from '@ant-design/icons'
import { Form, Card, Button, Space,Input,Row,QRCode,Tooltip,InputNumber,Switch,ColorPicker,Flex } from 'antd'
import logo from '../../../logo.svg'
import * as htmlToImage from 'html-to-image'

let tableForms={}

const TableQRCode = ({item}) => {
  const { key,form,initialValues } = item
  const values = form.getFieldsValue()
  const { name,size:sizeCM,icon:iconVal,color:colorVal,bgColor:bgColorVal } = values
  const size = (sizeCM || 8) * 25;
  const iconSize =size/4
  const icon = iconVal && logo
  const color = colorVal || '#000000'
  const bgColor = bgColorVal || '#ffffff'
  return (
    <div id={`qrcode${key}`} className={style.qrcode}>
      <QRCode
        errorLevel="H"
        value=" "
        size={size}
        iconSize={iconSize}
        icon={icon}
        color={(typeof color)==='string'?color:color.toHexString()}
        bgColor={(typeof bgColor)==='string'?bgColor:bgColor.toHexString()}
      />
      <span className={style.qrcodeName}>{name}</span>
    </div>
  )
}

const TableForm = ({item,index,remove}) => {
  console.log('TableForm')
  console.log(item)
  const { key,initialValues } = item
  const [ form ] = Form.useForm()
  const idValue = Form.useWatch('id', form);
  tableForms['form'+key]=form
  const loadQRCode=(key)=>{
    const node = document.getElementById(`qrcode${key}`)
    htmlToImage.toPng(node).then(function (dataUrl) {
      var link = document.createElement('a')
      link.download = `qrcode${key+1}.png`
      link.href = dataUrl
      link.click()
    })
  }

  const onFinish = values => {
    console.log(values)
    const id = new Date().getTime()
    form.setFieldValue('id',id)
  }

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <Card 
        hoverable 
        title={index+1} 
        extra={
          <Button size="small" type="link" onClick={remove}><MinusCircleOutlined /> 删除</Button>
        }
        actions={[
          <Tooltip title={idValue&&"保存后可下载二维码"} color="blue" >
            <Button size="small" type="link" disabled={!idValue} onClick={() => loadQRCode(item.key)} ><DownloadOutlined />下载二维码</Button>
          </Tooltip>,
          <Button size="small" type="link" htmlType="submit">保存</Button>,
        ]}>
        <Form.Item name="id" className={style.hide}> <Input /></Form.Item>
        <Form.Item label="餐桌名称" name="name" rules={[ { required: true,message: 'Missing first name' },]}>
          <Input placeholder="餐桌名称" />
        </Form.Item>
        <Form.Item label="座位数" name="seat" rules={[{ required: true, message: '请填写座位数'}]}>
          <InputNumber placeholder="座位数" addonAfter="座" className={style.seat}/>
        </Form.Item>
        <Flex justify="space-between" gap="middle">
          <Form.Item shouldUpdate className={style.qrcodeitem}>
            {() => {
              return <TableQRCode item={{form,key,initialValues}} />
            }}
          </Form.Item>
          <Flex vertical="vertical">
              <Form.Item label="icon" name="icon">
                <Switch />
              </Form.Item>
              <Form.Item label="大小" name="size">
                <InputNumber min={6} max={10} addonAfter="cm" className={style.inputnumber} />
              </Form.Item>
              <Form.Item label="颜色" name="color">
                <ColorPicker showText />
              </Form.Item>
              <Form.Item label="背景色" name="bgColor">
                <ColorPicker showText />
              </Form.Item>
            </Flex>
        </Flex>
      </Card>
    </Form>
  )
}

export default function Table() {
  const [ tableDatas ,setTableDatas ]  = useState ([])

  const add = () => {
    const obj={
      key:new Date().getTime(),
      initialValues:{
        state:0,
        id:null,
        name:tableDatas.length+1+'号桌',
        seat: null,
        icon: true,
        size:8,
        color:'#000000',
        bgColor:'#ffffff'
      }
    }
    const newTableDatas = [...tableDatas,obj]
    setTableDatas(newTableDatas)
  }

  const remove = key => {
    console.log('remove = key')
    console.log(key)
    console.log(tableDatas)
    const newTableDatas=tableDatas.filter(item=>item.key!==key)
    console.log(newTableDatas)
    setTableDatas(newTableDatas)
    if(!newTableDatas.length){
      tableForms={}
    }
  }

  const saveAll= async ()=>{
    console.log(tableForms)
    if( !Object.keys(tableForms).length ) return
    const formAll=[]
    for( let key in tableForms ){
      formAll.push(tableForms[key].validateFields())
    }
    const res = await Promise.all(formAll)
  }
  
  return (
    <>
      <Row className={style.handle}>
        <Space>
          <Button type="primary" onClick={saveAll}>全部保存</Button>
          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}> 添加餐桌 </Button>
        </Space>
      </Row>
      <Space size={[8, 16]} wrap align="start" className={style.container}>
        {tableDatas.map((item,index)=>{
          return (
            <TableForm key={index} item={item} index={index} remove={()=>remove(item.key)} />
          ) 
        })}
      </Space>
    </>
  )
}




