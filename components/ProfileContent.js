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
      <section className="w-full  relative h-[250px]">
        <Image
          src={profileUser.coverPhoto}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
          blurDataURL="URL"
          placeholder="blur"
        />
        <div className="absolute left-50% -translate-x-1/2 -bottom-12 rounded-full border-4 border-white bg-white">
          <div className="w-24 h-24 relative">
            <Image
              src={profileUser.profilePhoto}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              blurDataURL="URL"
              placeholder="blur"
            />
          </div>
        </div>
      </section>
      <section className="mt-12 flex justify-start mb-2 px-4">
        
          <div className="w-full">
              <p className="text-2xl text-center">{profileUser.username}</p>
              <div className="flex justify-between mt-2">
                <p className="text-sm font-light">{profileUser.followersCount} Followers</p>
                <p className="text-sm font-light">{profileUser.followingCount} Following</p>
              </div>
              {profileUser.username !== currentUser.username && <button onClick={followUnfollowProfileUser} className="bg-blue text-white rounded-md px-2 py-1 w-full mt-2">{isFollowing ? 'Followed' : 'Follow'}</button>}
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
