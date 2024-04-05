"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { PersonAddAlt, PersonRemove } from '@mui/icons-material'

const UserCard = ({userData}) => {
    const {user , isLoaded} = useUser()

    const [loading,setLoading] = useState(true)

    const[userInfo,setUserInfo] =useState({})

    const getUser = async()=>{
        const response = await fetch(`/api/user/${user.id}`,{
            method:'GET',
            headers:{
                'Content-Type':"Application/json"
            }
        })

        const data = await response.json()
        setUserInfo(data)
        setLoading(false)
    }

    useEffect(()=>{
        if(user){
            getUser()
        }
    },[user])

    const isFollwing = userInfo?.following?.find((item)=> item.id === userData._id)

  return loading || !isLoaded ? <Loader/> : (
    <div className='flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
            <Image src={userData.profilePhoto} alt='profile pic' width={50} height={50} className='rounded-full'/>
            <div className='flex flex-col gap-1'>
                <p className='text-small-semibold text-light-1'>{userData.firstName} {userData.lasttName}</p>
                <p className='text-subtle-medium textlight-3'>@{userData.username}</p>
            </div>
        </div>  

        {user.id !== userData.clerkId && (

            isFollwing ? (
                <PersonRemove sx={{color:'#7857ff',cuesor:'pointer'}}/>

            ):(
                <PersonAddAlt sx={{color:'#7857ff',cuesor:'pointer'}}/>
            )           
        )}

    </div>
  )
}

export default UserCard