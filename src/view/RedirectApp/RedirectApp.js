import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { tableQrcodeUrl } from '../../api/business'

export default function RedirectApp() {
  const [searchParams] = useSearchParams()

  const redirect = async () => {
    console.log(searchParams)
    const code = searchParams.get('code')
    const res = await tableQrcodeUrl({code})
  }

  useEffect(()=>{
    redirect()
  },[ ])

  return (
    <div>
      11
    </div>
  )
}
