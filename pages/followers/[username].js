
import { parseCookies } from "nookies";
import cookie from "js-cookie";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { getSinglePost } from "../../utils/postActions";
import Navbar from "../../components/Navbar";
import RightSidebar from "../../components/RightSidebar";
import { getCurrentUser, getSuggestedusers, getUserFollowers } from "../../utils/userActions";
import withAuth from "../../HOC/withAuth";
import ProfileHeader from "../../components/Profile/ProfileContent";
import FollowersFollowing from "../../components/FollowersFollowing";
import Head from "next/head";

function FollowersList({ suggestedUsers,user,followers,errorLoading }) {
  const router = useRouter()
 
  if (errorLoading) {
    return <div className="w-screen h-screen grid place-items-center">Some Server Error Occured</div> 
  }

  

  return (
    <main>
        <Head>
            <title>Followers - {router.query.username}</title>
        </Head>
      <Navbar user={user} />
    <div className="flex mt-12">
        <div className='hidden lg:block md:w-1/5 py-4 md:fixed px-4 top-[50px]'>
                <ProfileHeader profileUser = {user} currentUser = {user}/>
        </div>
        <div className="w-full lg:w-58% bg-gray-100 lg:ml-20% overflow-hidden pb-12 px-12 mt-4">
            <FollowersFollowing user = {user} followers={followers} />
        </div>
      <RightSidebar user={user} suggestedUsers={suggestedUsers} />
    </div>
    </main>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { token } = parseCookies(ctx);

    const { username } = ctx.query
  

    const [suggestedUsers,user,followers] = await Promise.all([
      getSuggestedusers(token),
      getCurrentUser(token),
      getUserFollowers(token,username,0)
    ])

    console.log(followers)

    return {
      props: {
        suggestedUsers,
        user,
        followers
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

export default withAuth(FollowersList);
