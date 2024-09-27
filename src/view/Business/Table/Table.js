import React, { useState, useEffect, useRef } from 'react'
import style from './Table.module.scss'
import { MinusCircleOutlined, PlusOutlined,DownloadOutlined } from '@ant-design/icons'
import { Form, message, Button, Space,Input,Row,QRCode,Tooltip,InputNumber,Switch,ColorPicker,Flex } from 'antd'
import logo from '../../../logo.svg'
import * as htmlToImage from 'html-to-image'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../store'
import { addTableQrcode, tableQrcodesList, editTableQrcode,batchTableQrcode } from '../../../api/business'
import TableForm from './components/TableForm/TableForm'
import { uuid } from '../../../utils'

function Table() {
  const { user } = useStore()
  const { shopId, shopLogo } = user
  const [ tableDatas, setTableDatas ]  = useState ([])
  const [ tableForms, setTableForms ]  = useState ({})

  const getTableQrcodesList = async ()=>{
    const res = await tableQrcodesList({shopId})
    const list=[]
    res.list.forEach(item=>{
      const { id, seat, name, content, shop_id:shopId, qr_code_bg_color:qrCodeBgColor, qr_code_color:qrCodeColor, qr_code_icon:qrCodeIcon, qr_code_size:qrCodeSize } = item
      const obj={
        formName:'form'+ id,
        initialValues:{ id, seat, name, shopId, qrCodeIcon, qrCodeSize, qrCodeColor, qrCodeBgColor, content }
      }
      list.push(obj)
    })
    setTableDatas(list)
  }

  const init = () => {
    getTableQrcodesList()
    setTableForms({})
  }

  useEffect(()=>{
    init()
  },[ shopId ])

  const add = () => {
    const obj={
      formName:'form'+uuid(),
      initialValues:{
        shopId,
        name:tableDatas.length+1+'号桌',
        seat: 4,
        qrCodeIcon: true,
        qrCodeSize:8,
        qrCodeColor:'#000000',
        qrCodeBgColor:'#ffffff'
      }
    }
    const newTableDatas = [...tableDatas,obj]
    setTableDatas(newTableDatas)
  }

  const remove = formName => {
    const newTableDatas=tableDatas.filter(item=>item.formName!==formName)
    setTableDatas(newTableDatas)
    if(!newTableDatas.length){
      setTableForms({})
    }
  }

  const saveOne = async (form) => {
    const { id, qrCodeIcon:icon, ...rest } = form.getFieldsValue(true)
    const qrCodeIcon = icon ? 1 : 0
    const params = {...rest,id,shopId,qrCodeIcon}
    if(id){
      await editTableQrcode(params)
    }else{
      const res = await addTableQrcode(params)
      form.setFieldsValue(res)
    }
    message.success('操作成功')
  }

  const saveAll= async ()=>{
    if( !Object.keys(tableForms).length ) return
    const formAll=[]
    for( let key in tableForms ){
      try{
        await tableForms[key].validateFields()
        formAll.push(tableForms[key].getFieldsValue(true))
      }catch(err){
        return
      }
    }
    Promise.all(formAll).then(async res =>{
      const tables=res.map(item=>{
        const { qrCodeIcon:icon, ...rest } = item
        const qrCodeIcon = icon ? 1 : 0
        return {...rest,qrCodeIcon}
      })
      await batchTableQrcode({tables})
      message.success('操作成功')
      init()
    }).catch(err=>{
      console.log(err)
    })
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
            <Form.Provider key={index} onFormFinish={(name, { forms }) => saveOne(forms[name]) }   >
              <TableForm tableForms={tableForms} item={item} index={index} remove={()=>remove(item.formName)} logo={ shopLogo } />
            </Form.Provider>
          ) 
        })}
      </Space>
    </>
  )
}

export default observer(Table)





