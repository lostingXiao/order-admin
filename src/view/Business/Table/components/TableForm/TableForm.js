import React,{ useEffect } from 'react'
import style from './style.module.scss'
import { Form, Card, Button,Input,Tooltip,InputNumber,Switch,ColorPicker,Flex } from 'antd'
import { MinusCircleOutlined,DownloadOutlined } from '@ant-design/icons'
import * as htmlToImage from 'html-to-image'
import TableQRCode from '../TableQRCode/TableQRCode'

function TableForm ({ logo,tableForms, item, index, remove }) {
  const { formName,initialValues } = item
  const [ form ] = Form.useForm()
  const id = Form.useWatch('id', { form, preserve: true })

  const loadQRCode=(formName,name)=>{
    const node = document.getElementById(`qrcode${formName}`)
    htmlToImage.toPng(node).then(function (dataUrl) {
      var link = document.createElement('a')
      link.download = `${name}.jpg`
      link.href = dataUrl
      link.click()
    })
  }


  useEffect(()=>{
    tableForms[formName]=form
    form.setFieldsValue(initialValues)
  },[ form,tableForms,formName,initialValues ])

  return (
    <Form form={form} name={formName} initialValues={initialValues} >
      <Card 
        hoverable 
        title={index+1} 
        extra={
          <Button size="small" type="link" onClick={remove}><MinusCircleOutlined /> 删除</Button>
        }
        actions={[
          <Tooltip title={ !id && "保存后可下载二维码"} color="blue" >
            <Button size="small" type="link" disabled={!id} onClick={() => loadQRCode(formName,initialValues.name)} ><DownloadOutlined />下载二维码</Button>
          </Tooltip>,
          <Button size="small" type="link" htmlType="submit">保存</Button>,
        ]}>
        <Form.Item label="餐桌名称" name="name" rules={[ { required: true,message: 'Missing first name' },]}>
          <Input placeholder="餐桌名称" />
        </Form.Item>
        <Form.Item label="座位数" name="seat" rules={[{ required: true, message: '请填写座位数'}]}>
          <InputNumber placeholder="座位数" addonAfter="座" className={style.seat}/>
        </Form.Item>
        <Flex justify="space-between" gap="middle">
          <Form.Item shouldUpdate className={style.qrcodeitem}>
            {() => {
              return <TableQRCode logo={logo} item={{form,formName}} />
            }}
          </Form.Item>
          <Flex vertical="vertical">
              <Form.Item valuePropName="checked" label="icon" name="qrCodeIcon">
                <Switch />
              </Form.Item>
              <Form.Item label="大小" name="qrCodeSize">
                <InputNumber min={6} max={10} addonAfter="cm" className={style.inputnumber} />
              </Form.Item>
              <Form.Item label="颜色" name="qrCodeColor">
                <ColorPicker showText onChange={(...v)=>form.setFieldValue('qrCodeColor',v[1])} />
              </Form.Item>
              <Form.Item label="背景色" name="qrCodeBgColor">
                <ColorPicker showText onChange={(...v)=>form.setFieldValue('qrCodeBgColor',v[1])} />
              </Form.Item>
            </Flex>
        </Flex>
      </Card>
    </Form>
  )

}

export default TableForm