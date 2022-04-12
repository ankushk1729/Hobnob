import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";
import { followUnfollowUser } from '../utils/userActions'

function ProfileHeader({ profileUser,currentUser }) {
  const isCreatePostModalOpen = useSelector(state=>state.createPost.value)
  const [isFollowing,setIsFollowing] = useState(profileUser.followers.includes(currentUser.username))

  const followUnfollowProfileUser = () => {
      followUnfollowUser(profileUser.username)
      setIsFollowing(state=>!state)
  }

  return (
    <div className="w-full bg-white rounded-t-2xl rounded-b-xl pb-4">
      {isCreatePostModalOpen && <CreatePostModal />}
      <section className="w-full  relative h-[300px]">
        <Image
          src={profileUser.coverPhoto}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
        <div className="absolute left-6 -bottom-8 md:-bottom-12 lg:-bottom-16 rounded-full border-4 border-white bg-white">
          <div className="w-16  h-16 md:w-24 md:h-24 lg:w-28 relative lg:h-28">
            <Image
              src={profileUser.profilePhoto}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </section>
      <section className="mt-4 flex justify-start mb-2 px-4">
        <div className="w-1/5"></div>
          <div className="w-3/5">
              <p className="text-2xl">{profileUser.username}</p>
              <p className="text-sm font-light">{profileUser.followersCount} Followers</p>
              <p className="text-sm font-light">{profileUser.followingCount} Following</p>
          </div>
          <div className="w-1/5 flex justify-end items-start">
            {profileUser.username !== currentUser.username && <button onClick={followUnfollowProfileUser} className="bg-blue text-white rounded-md px-2 py-1">{isFollowing ? 'Followed' : 'Follow'}</button>}
          </div>
      </section>
      <hr/>
      <section className="mt-2 px-4">
        <p className="text-xl font-medium">About Me</p>
        <p className=" font-light">{profileUser.bio}</p>
      </section>
      </div>
  );
}

export default ProfileHeader;
