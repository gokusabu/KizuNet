"use client"
import Loader from '@app/components/Loader'
import ProfileCard from '@app/components/cards/ProfileCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile = () => {

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

  return loading ? <Loader/> : (
    <ProfileCard userData={userData} />
  )
}

export default Profile