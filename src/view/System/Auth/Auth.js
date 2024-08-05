import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Auth.module.scss'
import { Modal,Space,Input,Button } from "antd"
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { authList,addAuth } from '../../../api/system'

const searchData=[
  { key:'ccc',type:'input',placeholder:'qqqq',label:'字段名' },
  { key:'vvv',type:'input',placeholder:'qqqq',label:'字段名' },
]

const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '2', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '3', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '4', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '5', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
];



export default function Auth() {
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const [ tableData,setTableData ] =useState([])
  
  const [currentItem,setCurrentItem] = useState({})

  const buttons=[
    {label:'新增',onClick:()=>setOpen(true)},
    // {label:'修改',onClick:edit},
    // {label:'导出',onClick:detail},
  ]

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'ID',},
    { title: '名称',dataIndex: 'name',key: 'name',},
    { title: 'CODE', dataIndex: 'code', key: 'code',},
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      render: (_,record) => (
        <Space>
          <Button type='primary' size="small" onClick={()=>handleEdit(record)}>编辑</Button>
          {/* <Button size="small" onClick={()=>handleDel(record)}>删除</Button> */}
        </Space>
      )
    },
  ];

  const onFinish = (values) => {
    console.log('Shop values of form: ', values);
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
  }
  const handleCancel=()=>{
    setCurrentItem({})
    setOpen(false)
  }

  const getAuthList = async () =>{
    const res = await authList({pageNum:1,pageSize:10})
    // setTableData(res.data.list)
  }

  useEffect(() => {
    getAuthList()
  }, [])

  return (
    <div className={style.auth}>
      <SearchForm data={searchData} api={onFinish}/>
      <DataTable dataSource={tableData} columns={columns} buttons={buttons} />
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