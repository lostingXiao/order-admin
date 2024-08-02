import React from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import style from './SiderNav.module.scss'
import { menuItems } from '../../../mock'

export default function SiderNav() {
  const navigate = useNavigate()
  const MenuClick=e=>{
    console.log(e)
    const { keyPath }=e
    const url=keyPath.reduceRight((base,item)=>{
      return base+'/'+item
    })
    console.log(url)
    navigate(url)
  }
  return (
    <>
      <div className={style.logo}>logo</div>
      <Menu theme="dark" defaultSelectedKeys={['/home']} mode="inline" items={menuItems} onClick={MenuClick} />
    </>
  )
}
