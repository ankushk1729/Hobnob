import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";

import { parseCookies } from "nookies";

import { useState } from "react";

import { getSavedPosts } from "../utils/postActions";
import { getCurrentUser, getSuggestedusers } from "../utils/userActions";

import withAuth from "../HOC/withAuth";
import CreatePostModal from "../components/Modals/CreatePostModal";
import NotificationModal from "../components/Modals/NotificationModal";

import ProfileHeader from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import PostLikesModal from "../components/Modals/PostLikesModal";

function Bookmark({ suggestedUsers, postsData, user }) {
  const isCreatePostModalOpen = useSelector(state=>state.createPost.value)
  const isNotificationModalOpen = useSelector(state=>state.notification.value)
  const isPostLikesModalOpen = useSelector(state=>state.postLikesModal.open)
  

  return (
    <main className="h-screen flex-col justify-between">
      {isCreatePostModalOpen && <CreatePostModal />}
      {isPostLikesModalOpen && <PostLikesModal/>}
      <Navbar
        user={user}
      />
    <div className="h-80% mt-10 flex">
    <div className='hidden lg:block md:w-1/5 py-4 md:fixed px-4 top-[50px]'>
                <ProfileHeader profileUser = {user} currentUser = {user}/>
            </div>
      <div className="w-full lg:w-58% bg-gray-100 lg:ml-20% overflow-hidden">
        
        {postsData.length > 0 ?  
        <Feed
          postsData={postsData}
          user={user}/> : 
        <p className="flex justify-center py-4 text-xl">No Saved Posts</p>
        } 
      </div>
      <RightSidebar user={user} suggestedUsers={suggestedUsers} />
    </div>
    { isNotificationModalOpen && 
    <div className="px-8 py-4 fixed right-12 bottom-8 bg-white slider slide-in shadow-md">
      <NotificationModal />
    </div>
    }
    </main>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { token } = parseCookies(ctx);

    const [suggestedUsers,{ posts },user] = await Promise.all([
      getSuggestedusers(token),
      getSavedPosts(0, token),
      getCurrentUser(token)
    ])

    return {
      props: {
        suggestedUsers,
        postsData: posts,
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        errorMessage: "Not working",
      },
    };
  }
}

export default withAuth(Bookmark)