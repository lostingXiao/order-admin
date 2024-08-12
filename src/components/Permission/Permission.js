import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store'
import { authorization } from '../../api/system'

function Permission({code,children}) {
  const [ hasPermission,setHasPermission ] = useState(false)
  const { user } = useStore()

  const getPermission = async () => {
    const { result } = await authorization({code})
    console.log(result)
    setHasPermission(result)
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