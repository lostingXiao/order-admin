import React,{ useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Shop.module.scss'
import DataTable from '../../../components/DataTable/DataTable'
import SearchForm from '../../../components/SearchForm/SearchForm'
import { shopList,addShop } from '../../../api/business'

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
  { key:'name',type:'input',placeholder:'店铺名称',label:'店铺名称' },
]




export default function List() {
  const navigate = useNavigate()
  const tableRef = useRef(null);
  const [searchFormData,setSearchFormData] =useState({})

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
  const onValuesChange = (changedValues,allValues) => {
    console.log('onValuesChange form: ');
    console.log(changedValues)
    console.log(allValues)
    setSearchFormData(allValues)
  }


  return (
    <div className={style.shop}>
      <SearchForm data={searchData} onFinish={onFinish} onValuesChange={onValuesChange}/>
      <DataTable ref={tableRef} columns={columns} buttons={buttons} params={searchFormData} api={shopList} />
    </div>
  )
}