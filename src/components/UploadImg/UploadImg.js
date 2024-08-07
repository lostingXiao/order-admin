import React, { useState } from 'react'
import { Image, Upload,message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uploadImg as uploadImgApi } from '../../api/public'

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
})

export default function UploadImg({ maxCount,onChange }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([])

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const beforeUpload=(file)=>{
    console.log('beforeUpload')
    console.log(file)
    const { size } = file
    const isLt1M = size / 1024 / 1024 < 1;
    if (!isLt1M) {
      message.error('Image must smaller than 1MB!');
    }
    return isLt1M || Upload.LIST_IGNORE
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  }

  const handleChange = ({ file,fileList:newFileList }) => {
    const { status } = file
    setFileList(newFileList)
    if (status === 'done'||status === 'removed') {
      const uploadedFileList=newFileList.filter(item=>item.status === 'done')
      onChange(uploadedFileList)
    }
  }

  return (
    <div>
      <Upload
        action={uploadImgApi}
        listType="picture-card"
        fileList={fileList}
        maxCount={maxCount}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        { maxCount ? (fileList.length >= maxCount ? null : uploadButton) : uploadButton }
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  )
}
