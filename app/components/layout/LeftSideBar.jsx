"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Menu from './Menu'
import { SignOutButton, SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Logout } from '@mui/icons-material'
import Loader from '../Loader'

const LeftSideBar = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
  
  return loading || !isLoaded ? <Loader/> :(
    <div className='h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[350px] custom-scrollbar'>
        <Link href='/'>
            <Image src='/assets/logo.png' alt='logo' width={200} height={200} className='rounded-full'/>
        </Link>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2 items-center text-light-1'>
            <Link href={`/profile/${userData._id}/posts`}>
              <Image src={userData?.profilePhoto} alt='profilePhoto' width={50} height={50} className='rounded-full'/>
            </Link>
            <p className='text-small-bold'>{userData?.firstName} {userData?.lastName}</p>
          </div>
            <div className='flex text-light-1 justify-between'>
              <div className='flex flex-col items-center'>
                <p className='text-base-bold'>{userData?.posts.length}</p>
                <p className='text-tiny-medium'>posts</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-base-bold'>{userData?.followers.length}</p>
                <p className='text-tiny-medium'>Followers</p>
              </div>
              <div className='flex flex-col items-center '>
                <p className='text-base-bold'>{userData?.following.length}</p>
                <p className='text-tiny-medium'>Following</p>
              </div>
            </div>

            <hr />

            <Menu/>

            <hr />

            <div className='flex gap-4 items-center'>
              <UserButton  appearance={{baseTheme : dark}}/>
              <p className='text-light-1 text-body-bold'>Manage Profile</p>
            </div>

            <SignedIn>
              <SignOutButton>
                <div className='flex items-center cursor-pointer gap-4'>
                  <Logout sx={{color:'white', fontSize:"32px"}}/>
                  <p className='text-body-bold text-light-1'>Log out</p>
                </div>
              </SignOutButton>
            </SignedIn>

          

        </div>
    </div>
  )
}

export default LeftSideBar