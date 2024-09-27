import React from 'react'
import { useNavigate } from 'react-router-dom'

import style from './Goods.module.scss'
import { goodsList } from '../../../api/business'
import { Button, Space,Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../store'
import SearchTable from '../../../components/SearchTable/SearchTable'

function Goods() {
  const navigate = useNavigate()
  const { user } = useStore()
  const { shopId } = user

  const searchData=[
    { key:'shopId',hide:true,value:shopId },
    { key:'name',type:'input',placeholder:'商品名称',label:'商品名称' },
    { key:'state',type:'select',placeholder:'销售状态',label:'销售状态',
      options:[
        { value: '1', label: '上架'},
        { value: '2', label: '下架'},
      ] 
    }
  ]

  const config=(type,id)=>{
    console.log(shopId)
    // navigate(`/business/businessGoods/${type}`,{state:{id}})
  }

  const columns = [
    { title: '商品名称',dataIndex: 'name',key: 'name',},
    { title: '图片', dataIndex: 'img', key: 'img',  render: (text, record, index) => (<Image width={100} src={record.img}/>)},
    { title: '单价', dataIndex: 'price', key: 'price',},
    { title: '销售状态', dataIndex: 'state_name', key: 'state_name',},
    { title: '商品种类', dataIndex: 'type_name', key: 'type_name',},
    { title: '描述', dataIndex: 'description', key: 'description',},
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at',},
    { title: '操作', key: 'index', render: (text, record, index) => {
        return (
          <Space>
            <Button type='link' onClick={()=>config('edit',record.id)}>编辑</Button>
            <Button type='link' onClick={()=>config('detail',record.id)}>详情</Button>
          </Space>
        )
      } 
    }
  ]

  return (
    <div className={style.goods}>
      <SearchTable rowKey='id' searchData={searchData} columns={columns} buttons={[{label:'新增',onClick:()=>config('add')}]} api={goodsList} />
    </div>
  )
}

export default observer(Goods)