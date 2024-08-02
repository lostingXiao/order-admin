import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './List.module.scss'
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'

const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '2', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '3', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '4', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '5', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
];
const columns = [
  { title: '姓名',dataIndex: 'name',key: 'name',},
  { title: '年龄', dataIndex: 'age', key: 'age',},
  { title: '住址', dataIndex: 'address', key: 'address',},
];

const searchData=[
  { key:'ccc',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'vvv',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'qq',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'ww',type:'input',placeholder:'qqqq',label:'字段名',rules:[{required: true,message: 'Input something!'}] },
  { key:'bbb',type:'select',placeholder:'select',label:'select',rules:[{required: true,message: 'select something!'}],options:[
    { value:'111',label:'111' },
    { value:'222',label:'222' },
    { value:'333',label:'333' },
    { value:'444',label:'444' },
    { value:'555',label:'555' },
  { value:'666',label:'666' },
  ] }
]




export default function List() {
  const navigate = useNavigate()
  const add=()=>{
    navigate('/shop/list/add')
  }
  const edit=()=>{
    navigate('/shop/list/set/edit',{state:{id:'1'}})
  }
  const detail=()=>{
    navigate('/shop/list/set/detail',{state:{id:'1'}})
  }
  const buttons=[
    {label:'新增',onClick:add},
    {label:'修改',onClick:edit},
    {label:'导出',onClick:detail},
  ]
  const onFinish = (values) => {
    console.log('Shop values of form: ', values);
  }

  return (
    <div className={style.shop}>
      <SearchForm data={searchData} onFinish={onFinish}/>
      <DataTable dataSource={dataSource} columns={columns} buttons={buttons} />
    </div>
  )
}
