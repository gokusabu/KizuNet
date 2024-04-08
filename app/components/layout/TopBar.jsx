"use client";
import { SignOutButton, SignedIn ,UserButton , useUser} from "@clerk/nextjs";
import { Add, Logout, Person, Search } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {dark} from '@clerk/themes'
import Loader from "../Loader";


const TopBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("")

  const {user ,isLoaded} = useUser()

  const [loading,setLoading] = useState(true)

  const [userData,setUserData] = useState({})

  const getUser = async()=>{
    const response = await fetch(`/api/user/${user.id}`)
    const data = await response.json()
    setUserData(data)
    setLoading(false)
  }

  useEffect(()=>{
    if(user){
      getUser()
    }
  },[user])


  return loading || !isLoaded ? <Loader/> : (
    <div className="flex justify-between items-center mt-6">
      <div className="relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Posts,People,..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Search className="search-icon" onClick={()=>router.push(`/search/posts/${search}`)} />
      </div>
      <button
        className="create-post-btn"
        onClick={() => {
          router.push("/create-post");
        }}
      >
        <Add />
        <p>Create Post</p>{" "}
      </button>

      <div className="flex gap-4 md:hidden">
        <Link href={`/profile/${userData._id}/posts`}>
          <Person sx={{fontSize:'35px' ,color:'white'}}/>
        </Link>

        <UserButton appearence={{baseTheme : dark}}/>
      </div>
    </div>
  );
};

export default TopBar;
