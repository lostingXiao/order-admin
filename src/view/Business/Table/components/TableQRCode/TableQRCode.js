import React, { useMemo } from 'react'
import style from './style.module.scss'
import { QRCode } from 'antd'

function TableQRCode({logo,item}) {
  const { form, formName } = item
  const values = form.getFieldsValue(true)
  const { name,content,qrCodeSize:sizeCM,qrCodeIcon:iconVal,qrCodeColor:colorVal,qrCodeBgColor:bgColorVal } = values
  const size = (sizeCM || 8) * 25;
  const iconSize = size / 5
  const icon = iconVal && logo
  const color = colorVal || '#000000'
  const bgColor = bgColorVal || '#ffffff'

  const computedQRCodeValue = (v) => {
    const origin = window.location.origin
    const path = `${origin}/#/redirectApp?code=${content}`
    console.log(path)
    return path
  }

  const value = useMemo(() => computedQRCodeValue(content), [content])

  return (
    <div id={`qrcode${formName}`} className={style.qrcode}>
      <QRCode
        errorLevel="L"
        value={ value }
        size={size}
        iconSize={iconSize}
        icon={icon}
        color={(typeof color)==='string'?color:color.toHexString()}
        bgColor={(typeof bgColor)==='string'?bgColor:bgColor.toHexString()}
      />
      <span className={style.qrcodeName}>{name}</span>
    </div>
  )
}

export default TableQRCode
