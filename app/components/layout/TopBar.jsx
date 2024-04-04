"use client";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Add, Logout, Search } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TopBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
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

      <div className="flex gap-3">
        <SignedIn>
          <SignOutButton>
            <div className="flex items-center cursor-pointer md:hidden">
              <Logout sx={{ color: "white", fontSize: "32px" }} />
            </div>
          </SignOutButton>
        </SignedIn>

        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="profile pic"
            width={50}
            height={50}
            className="rounded-full md:hidden"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
