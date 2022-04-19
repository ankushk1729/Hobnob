import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";
import { followUnfollowUser, updateProfile } from '../utils/userActions'
import cookie from "js-cookie";
import { uploadPic } from "../utils/uploadPic";
import {useRouter} from "next/router";

function ProfileHeader({ profileUser,currentUser }) {
  const isCreatePostModalOpen = useSelector(state=>state.createPost.value)
  const [isFollowing,setIsFollowing] = useState(profileUser.followers.includes(currentUser.username))

  const [coverPhoto,setCoverPhoto] = useState(profileUser.coverPhoto)
  const [profilePhoto,setProfilePhoto] = useState(profileUser.profilePhoto)

  const [coverPhotoFile,setCoverPhotoFile] = useState(null)
  const [profilePhotoFile,setProfilePhotoFile] = useState(null)

  const router = useRouter()

  const isProfilePage = router.pathname.startsWith('/profile')

  const followUnfollowProfileUser = () => {
      followUnfollowUser(profileUser.username)
      setIsFollowing(state=>!state)
  }

  const handleCoverPhotoSubmit = async(e) => {
      setCoverPhotoFile(e.target.files[0])

      try {
          
          const imgUrl = await uploadPic(e.target.files[0])
      
          await updateProfile({coverPhoto:imgUrl,token:cookie.get('token')})
          setCoverPhoto(imgUrl)
      } catch (error) {
          console.log(error)
      }

  }

  const handleProfilePhotoSubmit = async(e) => {
    setProfilePhotoFile(e.target.files[0])

    try {
        
        const imgUrl = await uploadPic(e.target.files[0])
    
        await updateProfile({profilePhoto:imgUrl,token:cookie.get('token')})
        setProfilePhoto(imgUrl)
    } catch (error) {
        console.log(error)
    }

}

  return (
    <div className="w-full bg-white rounded-t-2xl rounded-b-xl pb-4">
      {isCreatePostModalOpen && <CreatePostModal />}
      <section className={`w-full  relative ${isProfilePage ? 'h-[250px]' : 'h-[200px]'} `}>
        <Image
          src={coverPhoto}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
          blurDataURL="URL"
          placeholder="blur"
        />
        { isProfilePage && profileUser.username === currentUser.username &&
        <div className="absolute right-2 -bottom-4 z-10 bg-white rounded-full p-1 border border-1 cursor-pointer">
              <label htmlFor="cover-image-upload" classname= "bg-white rounded-full p-1">
                 <div className="h-4 w-4 relative rounded-full"  >
                      <Image src= '/Image-icon.png' layout="fill" objectFit="cover" className="cursor-pointer" />
                 </div>
              </label>

              <input accept="image/*" onChange={handleCoverPhotoSubmit} className="hidden" type='file' id="cover-image-upload"></input>
        </div>
        } 
        <div className={`absolute left-50% -translate-x-1/2 ${isProfilePage ? '-bottom-12' : '-bottom-10'}  rounded-full border-4 border-white bg-white`}>
          <div className={`${isProfilePage ? 'w-24 h-24':'w-16 h-16'}  relative`}>
            <Image
              src={profilePhoto}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              blurDataURL="URL"
              placeholder="blur"
            />
            { isProfilePage && profileUser.username === currentUser.username &&
        <div className="absolute right-2 -bottom-2 z-10 bg-white rounded-full p-1 border border-1 cursor-pointer">
              <label htmlFor="profile-image-upload" classname= "bg-white rounded-full p-1">
                 <div className="h-4 w-4 relative rounded-full"  >
                      <Image src= '/Image-icon.png' layout="fill" objectFit="cover" className="cursor-pointer" />
                 </div>
              </label>

              <input accept="image/*" onChange={handleProfilePhotoSubmit} className="hidden" type='file' id="profile-image-upload"></input>
        </div>
        } 
          </div>
        </div>
      </section>
      <section className="mt-12 flex justify-start mb-2 px-4">
        
          <div className="w-full">
              <p className={` ${isProfilePage ? 'text-2xl' : 'text-lg font-semibold'}  text-center`}>{profileUser.username}</p>
              <div className="flex justify-between mt-2">
                <p className="text-sm font-light">{profileUser.followersCount} {profileUser.followersCount === 1 ? 'Follower' : 'Followers'}</p>
                <p className="text-sm font-light">{profileUser.followingCount} Following</p>
              </div>
              {profileUser.username !== currentUser.username && <button onClick={followUnfollowProfileUser} className="bg-blue text-white rounded-md px-2 py-1 w-full mt-2">{isFollowing ? 'Followed' : 'Follow'}</button>}
          </div>
      </section>

      { isProfilePage &&
        <>
        <hr/>
        <section className="mt-2 px-4">
          <p className="text-xl font-medium">About Me</p>
          <p className=" font-light">{profileUser.bio}</p>
        </section>
        </>
      }
      </div>
  );
}

export default ProfileHeader;
