"use client"
import Loader from '@app/components/Loader'
import PostCard from '@app/components/cards/PostCard'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const {user , isLoaded} = useUser()

  const [loading,setLoading] = useState(true)

  const [feedPost,setFeedPost] = useState([])

  const getFeedPost = async()=>{
    const response = await fetch('/api/post')
    const data = await response.json()
    setFeedPost(data)
    setLoading(false)
  }

  useEffect(()=>{
    getFeedPost()
  },[])
  
  return loading || !isLoaded ? <Loader/> :(
    <div className='flex flex-col gap-10'>
      {feedPost.map((post)=>(
        <PostCard
        key={post._id}
        post={post}
        creator={post.creator}
        loggedInUser={user}
        update={getFeedPost}
        />
      ))}
    </div>
  )
}

export default Home