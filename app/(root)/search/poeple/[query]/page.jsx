"use client"
import Loader from "@app/components/Loader";
import PostCard from "@app/components/cards/PostCard";
import UserCard from "@app/components/cards/UserCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPeople = () => {
  const { query } = useParams();

  const [loading, setLoading] = useState(true);

  const [searchedPeople, setSearchedPeople] = useState([]);

  const getSearchedPeople = async () => {
    try {
      const response = await fetch(`/api/user/search/${query}`);

      const data = await response.json();

      setSearchedPeople(data);
      setLoading(false);
      console.log("search complete",data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchedPeople();
  }, [query]);

  const { user , isLoaded } = useUser()

  return loading || !isLoaded ? (
  <Loader/>
  ) :(
    <div className="flex flex-col gap-5">
        <div className="flex gap-6">
            <Link className="tab bg-dark-2" href={`/search/posts/${query}`}>
                Posts
            </Link>
            <Link className="tab bg-purple-1" href={`/search/poeple/${query}`}>
                People
            </Link>
        </div>
        {searchedPeople.map((person)=>(
            <UserCard key={person._id} userData={person} update={getSearchedPeople} />
        ))}

    </div>
  ) 
};


export default SearchPeople