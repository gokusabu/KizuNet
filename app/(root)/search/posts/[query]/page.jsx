"use client"
import Loader from "@app/components/Loader";
import PostCard from "@app/components/cards/PostCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPost = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const [searchedPost, setSearchedPost] = useState([]);

  const getSearchedPosts = async () => {
    try {
      const response = await fetch(`/api/post/search/${query}`);

      const data = await response.json();

      setSearchedPost(data);
      setLoading(false);
      console.log("search complete",data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchedPosts();
  }, [query]);

  const { user , isLoaded } = useUser()

  return loading || !isLoaded ? (
  <Loader/>
  ) :(
    <div className="flex flex-col gap-5">
        <div className="flex gap-6">
            <Link className="tab bg-purple-1" href={`/search/posts/${query}`}>
                Posts
            </Link>
            <Link className="tab bg-purple-1" href={`/search/people/${query}`}>
                People
            </Link>
        </div>
        {searchedPost.map((post)=>(
            <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user}/>
        ))}

    </div>
  ) 
};

export default SearchPost;
