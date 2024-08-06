import React,{ useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Auth.module.scss'
import { Modal,Space,Input,Button } from "antd"
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { authList,addAuth } from '../../../api/system'

const searchData=[
  { key:'name',type:'input',label:'名称' },
  { key:'code',type:'input',label:'CODE' },
]

export default function Auth() {
  const navigate = useNavigate()
  const tableRef = useRef(null);
  const [open,setOpen] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const [formData,setFormData] =useState({})
  
  const [currentItem,setCurrentItem] = useState({})

  const buttons=[
    {label:'新增',onClick:()=>setOpen(true)},
  ]

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'ID',},
    { title: '名称',dataIndex: 'name',key: 'name',},
    { title: 'CODE', dataIndex: 'code', key: 'code',},
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      key: 'handle',
      render: (_,record) => (
        <Space>
          <Button type='primary' size="small" onClick={()=>handleEdit(record)}>编辑</Button>
          {/* <Button size="small" onClick={()=>handleDel(record)}>删除</Button> */}
        </Space>
      )
    },
  ];

  const onFinish = (v) => {
    console.log('Shop values of form: ', v);
    console.log(formData);
    tableRef.current.onReset();
  }
  const onValuesChange = (changedValues,allValues) => {
    console.log('onValuesChange form: ');
    console.log(changedValues)
    console.log(allValues)
    setFormData(allValues)
  }

  const handleEdit=(row)=>{
    setCurrentItem(row)
    setOpen(true)
  }
  const handleDel=(row)=>{
    // setCurrentItem(row)
    // setOpen(true)
  }

  const handleOk=async ()=>{
    console.log(inputValue)
    const res = await addAuth({name:inputValue})
    handleCancel()
  }
  const handleCancel=()=>{
    setCurrentItem({})
    setOpen(false)
  }

  useEffect(() => {
  }, [])

  return (
    <div className={style.auth}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={buttons} params={formData} api={authList} rowKey='id' />
      <Modal
        title={currentItem.id?'编辑权限':`添加权限`}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消">
          <Input value={inputValue} status={!inputValue&&'error'} placeholder="Error" onChange={({currentTarget})=>setInputValue(currentTarget.value)} />
      </Modal>
    </div>
  )
}