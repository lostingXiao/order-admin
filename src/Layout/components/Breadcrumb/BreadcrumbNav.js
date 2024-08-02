import React from 'react'
import style from './BreadcrumbNav.module.scss'
import { Breadcrumb } from 'antd'
import { useMatches } from 'react-router-dom'

export default function BreadcrumbNav() {

  function itemRender(currentRoute, params, items, paths) {
    return (currentRoute.handle.crumb(currentRoute.params))
  }

  const matches = useMatches();
  const crumbs = matches.filter((match) => Boolean(match.handle?.crumb))
  return (
    <div className={style.breadcrumbnav}>
      <Breadcrumb itemRender={itemRender} items={crumbs} />
    </div>
  )
}