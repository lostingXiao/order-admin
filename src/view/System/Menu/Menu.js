import React,{ useState,useEffect } from 'react'
import style from './Menu.module.scss'
import { useNavigate } from 'react-router-dom'
import { Tree,Space,Input,Popconfirm,Form, Button,Modal } from "antd"
// import { treeData } from '../../../mock'
import { CaretDownOutlined,PlusSquareOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons'
import { addMenu,menuList,editMenu,delMenu } from '../../../api/system'

export default function Menu() {
  const [form] = Form.useForm();
  const [currMenuItem, setCurrMenuItem] = useState({});
  const [handleType, setHandleType] = useState('add');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [treeData,setTreeData]=useState([])
  
  const confirm = v =>{
    form.submit()
  }

  const handleMenuClose = () =>{
    setOpen(false)
    form.resetFields()
  }
    
  const MenuHandle=item=>{
    setCurrMenuItem(item)
  }
  const onFinish = async (values) => {
    console.log('Success:', values)
    const api=handleType==='add'?addMenu:handleType==='edit'?editMenu:delMenu
    const res = await api({...values,[handleType==='add'?'parentId':'id']:currMenuItem.id})
    console.log(res)
    hideModal()
  }
  const getMenuList = async () =>{
    const res = await menuList()
    const list=res.data.list.map(item=>({
      ...item,
      title:item.name,
      key:item.id
    }))
    setTreeData(list)
    console.log('treeData')

    // console.log(treeData)
  }
  const showModal = ({handleType,node}) => {
    setHandleType(handleType)
    setCurrMenuItem(node)
    handleType==='edit'&&form.setFieldsValue(node)
    setOpen(true);
  }

  const hideModal=()=>{
    form.resetFields()
    setOpen(false)
  }

  useEffect(() => {
    getMenuList()
  }, [])

  const titleRender=(node)=>{
    return (
      <Space size='large'>
        {node.title}
        <Space>
          <PlusSquareOutlined style={{color:'var(--ant-blue)'}} onClick={()=>showModal({handleType:'add',node})} />
          <EditOutlined style={{color:'var(--ant-blue)'}} onClick={()=>showModal({handleType:'edit',node})} />
          <DeleteOutlined style={{color:'var(--ant-blue)'}} onClick={()=>showModal({handleType:'del',node})} />
        </Space>
      </Space>
    )
  }
  return (
    <div className={style.menu}>
      <Button type="primary" onClick={()=>showModal({handleType:'add',node:{}})}>添加一级菜单</Button>
      { treeData.length ? <Tree showLine treeData={treeData.length?treeData:[{title: '暂无菜单',id: null,}]} titleRender={titleRender} switcherIcon={<CaretDownOutlined />} /> :'' }
      <Modal
        title="Modal"
        open={open}
        onOk={confirm}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消">
        { handleType==='del'?`确定删除 ${currMenuItem.name}?`: <MenuForm form={form} node={currMenuItem} onFinish={onFinish}></MenuForm> }
      </Modal>
    </div>
  )
}



function MenuForm({form,node,type,onFinish}){
  console.log(node)
  const { name,path,id } = node
  const initialValues = { name,path }
  console.log(initialValues)
  // if(id) form.setFieldsValue(initialValues);
  return (
    <Form 
      form={form}
      // initialValues={initialValues}
      // disabled={confirmLoading}
      onFinish={onFinish}
      labelCol={{span: 4}} 
      wrapperCol={{span: 20}} 
      style={{width:400}}>
      <Form.Item
        label="名称"  
        name="name"
        rules={[{required: true,message: '菜单名称不能为空!'}]}>
        <Input showCount maxLength={20} placeholder="请填写子菜单名称" size="small" />
      </Form.Item>
      <Form.Item
        label="路径"
        name="path"
        rules={[{required: true,message: '跳转路径不能为空!'}]}>
        <Input showCount maxLength={50} placeholder="请填写子菜单名称" size="small" />
      </Form.Item>
    </Form>
  )
}