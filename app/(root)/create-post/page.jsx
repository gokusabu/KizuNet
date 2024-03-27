import Posting from '@app/components/form/Posting'
import React from 'react'

const CreatePost = () => {
  return (
    <div className='pt-6'><Posting post={postData} handlePublish={()=>{}}/></div>
  )
}

export default CreatePost