"use client"
import Loader from '@app/components/Loader'
import PostCard from '@app/components/cards/PostCard'
import ProfileCard from '@app/components/cards/ProfileCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs";

const ProfilePosts = () => {

  const { id }= useParams()

  const [loading,setLoading] = useState(true)

  const [userData,setUserData] = useState({})

  const getUser = async()=>{
    const response = await fetch(`/api/user/profile/${id}`)
    const data = await response.json()
    setUserData(data)
    setLoading(false)
  }
  useEffect(()=>{
    getUser()
  },[id])

  const {user , isLoaded} = useUser()

  return loading || !isLoaded ? <Loader/> : (
    <div className='flex flex-col gap-9'>
      <ProfileCard userData={userData} activeTab='Posts' />
      <div className='flex flex-col gap-9'>
        {userData?.posts?.map((post)=>(
          <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user}/>
        ))}

      </div>
    </div>
    
  )
}

export default ProfilePosts