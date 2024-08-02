import React from 'react'
import style from './Mine.module.scss'
import ShopForm from '../components/ShopForm/ShopForm'

export default function Mine() {
  return (
    <div className={style.mine}>
      <ShopForm />
    </div>
  )
}