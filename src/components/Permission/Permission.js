import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'

function Permission({code,children}) {
  const [ hasPermission,setHasPermission ] = useState(false)
  const { user } = useStore()
  const { rolePermissions } = user

  const getPermission = async () => {
    const flag=rolePermissions.includes(code)
    setHasPermission(flag)
  }

  useEffect(() => {
    getPermission()
  }, [])
  return (
    <>
      { hasPermission && children }
    </>
  )
}

export default observer(Permission)