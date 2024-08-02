import React from 'react'
import { Table,Row,Button,Space } from "antd"
import style from './DataTable.module.scss'

export default function DataTable({dataSource,columns,buttons}) {
  return (
    <div>
      {buttons?<Row className={style.buttons}>
        <Space>
          {buttons.map((item,index)=>(
            <Button key={index} type="primary" onClick={item.onClick}>{item.label}</Button>
          ))}
        </Space>
      </Row>:''}
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
