import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import RightSidebar from "../components/RightSidebar";
const ProfileHeader = dynamic(()=>import('../components/ProfileContent'))

import { parseCookies } from "nookies";
import cookie from "js-cookie";

import { useEffect, useState } from "react";
import { getSuggestedusers, getCurrentUser } from "../utils/userActions";
import { getTimelinePosts } from "../utils/postActions";
import { useRouter } from "next/router";

import withAuth from "../HOC/withAuth";
import dynamic from "next/dynamic";

import { useSelector } from 'react-redux'
import CreatePostModal from "../components/CreatePostModal";

function Home({ suggestedUsers, postsData, user, errorLoading }) {
  const isCreatePostModalOpen = useSelector(state=>state.createPost.value)

  const router = useRouter()
  if (errorLoading) {
    return <div className="w-screen h-screen grid place-items-center">Some Server Error Occured</div> 
  }

  return (
    <main className="h-screen flex-col justify-between">
      {isCreatePostModalOpen && <CreatePostModal />}
      <Navbar user={user} />
    <div className="flex h-80% mt-10">
      <div className='hidden lg:block md:w-1/5 py-4 md:fixed px-4 top-[50px]'>
                <ProfileHeader profileUser = {user} currentUser = {user}/>
            </div>
      <div className="w-full lg:w-58% bg-gray-100 lg:ml-20% overflow-hidden pb-12">
        <Feed postsData={postsData} user={user} />
      </div>
      <RightSidebar user={user} suggestedUsers={suggestedUsers} />
    </div>
    </main>
  );
}

export async function getServerSideProps(ctx) {

  try {
    const { token } = parseCookies(ctx);
  
    const [suggestedUsers, user, { posts: feedPosts }] = await Promise.all([
      getSuggestedusers(token),
      getCurrentUser(token),
      getTimelinePosts("top", 0, token)
    ])


    return {
      props: {
        suggestedUsers,
        postsData: feedPosts,
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        errorLoading: true,
      },
    };
  }
}

export default withAuth(Home);
