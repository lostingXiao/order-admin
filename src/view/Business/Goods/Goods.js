import React from 'react'
import { useNavigate } from 'react-router-dom'

import style from './Goods.module.scss'
import SearchForm from '../../../components/SearchForm/SearchForm'
import DataTable from '../../../components/DataTable/DataTable'
import { searchData,dataSource,columns } from '../../../mock'

export default function Goods() {
  const navigate = useNavigate()

  const add=()=>{
    navigate('/shop/goods/add')
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
    <div className={style.goods}>
      <SearchForm data={searchData} onFinish={onFinish}/>
      <DataTable dataSource={dataSource} columns={columns} buttons={buttons} />
    </div>
  )
}