"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import { tabs } from "@constants";
import Link from'next/link';

const ProfileCard = ({ userData , activeTab }) => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const data = await response.json();
    setUserInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const isFollwing = userInfo?.following?.find(
    (item) => item._id === userData._id
  );

  const handleFollow = async()=>{
      const response = await fetch(`/api/user/${user.id}/follow/${userData._id}`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
      })
      const data = await response.json()
      setUserInfo(data)
      console.log(data)
      
  }



  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      <div className="flex justify-betweemn items-start">
        <div className="flex items-start gap-5">
          <Image
            src={userData.profilePhoto}
            alt="profile image"
            width={100}
            height={100}
            className="rounded-full md:max-lg:hidden"
          />
          <div className="flex flex-col gap-3">
            <p className="text-light-1 text-heading3-bold max-sm:textheading4-bold">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-light-3 text-subtle-semibold">
              @{userData.username}
            </p>
            <div className="flex gap-7 text-small-bold max-sm:gap-4">
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userInfo.posts.length}</p>
                <p className="text-light-1">Posts</p>
              </div>
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userInfo.followers.length}</p>
                <p className="text-light-1">Followers</p>
              </div>
              <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                <p className="text-purple-1">{userInfo.following.length}</p>
                <p className="text-light-1">Following</p>
              </div>
            </div>
          </div>
          {user.id !== userData.clerkId &&
            (isFollwing ? (
              <PersonRemove
                sx={{ color: "#7857ff", cursor: "pointer", fontSize: "40px" }}
                onClick={()=>handleFollow()}
              />
            ) : (
              <PersonAddAlt
                sx={{ color: "#7857ff", cursor: "pointer", fontSize: "40px" }}
                onClick={()=>handleFollow()}
              />
            ))}
        </div>
      </div>

        <div className="flex gap-6">
          {tabs.map((tab)=>(
            <Link className={`tab ${activeTab === tab.name ? "bg-purple-1" : "bg-dark-2"}`} href={`/profile/${userData._id}/${tab.link}`}>
              {tab.name}
            </Link>
          ))}
        </div>


    </div>
  );
};

export default ProfileCard;