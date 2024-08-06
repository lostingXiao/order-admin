import React,{ useState,useEffect,useImperativeHandle,forwardRef } from 'react'
import { Table,Row,Button,Space } from "antd"
import style from './DataTable.module.scss'

const DataTable = forwardRef(({params,columns,buttons,api,rowKey,pageSize},ref)=> {
  const [ tableData,setTableData ] =useState([])
  const [ total,setTotal] =useState(0)

  const getList = async (v)=>{
    console.log('getList')
    const _pageSize=pageSize||10
    const res = await api({ ...params,pageNum:v,pageSize:_pageSize })
    const { total,list } = res.data
    setTableData(list)
    setTotal(total)
  }

  const tableChange=(v)=>{
    getList(v.current)
  }
  
  useImperativeHandle(ref, () => ({
    onReset: () => {
      console.log('onReset')
      console.log(params)
      getList(1)
    }
  }));

  useEffect(() => {
    getList(1)
  }, [])
  
  return (
    <div>
      {buttons?<Row className={style.buttons}>
        <Space>
          {buttons.map((item,index)=>(
            <Button key={index} type="primary" onClick={item.onClick}>{item.label}</Button>
          ))}
        </Space>
      </Row>:''}
      <Table 
      dataSource={tableData} 
      columns={columns} 
      pagination={{
        showTotal:(total) =>`共 ${total} 条`,
        pageSize,
        total:total,
      }} 
      rowKey={rowKey||''} 
      onChange={tableChange} />
    </div>
  )
})

export default DataTable