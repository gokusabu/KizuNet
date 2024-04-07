"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Loader from "@app/components/Loader";
import PostCard from "@app/components/cards/PostCard";

const SavedPosts = () => {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const response = await fetch(`api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
    console.log("data", data.savedPosts);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      {userData?.savedPosts?.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator}
          loggedInUser={user}
          update={getUser}
        />
      ))}
    </div>
  );
};

export default SavedPosts;
