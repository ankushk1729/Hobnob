import Feed from "../components/Feed";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

import { parseCookies } from "nookies";
import cookie from 'js-cookie'

import { useEffect, useState } from "react";
import { getSuggestedusers, getCurrentUser } from "../utils/userActions";
import { getTimelinePosts } from "../utils/postActions";
import { useRouter } from "next/router";

import withAuth from "../HOC/withAuth";

function Home({
  suggestedUsers,
  postsData,
  user,
  errorLoading,
}) {
  if (errorLoading) {
    return <div>No Ingles</div>
  }

 
  return (
    <div className=" flex">
      <LeftSidebar
        user={user}
      />
      <div className="w-90% lg:w-58% bg-gray-100 ml-10% md:ml-10% lg:ml-20% overflow-hidden pb-12">
        <Feed
          postsData={postsData}
          user={user}
        />
      </div>
      <RightSidebar user={user} suggestedUsers={suggestedUsers} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { token } = parseCookies(ctx);

    const suggestedUsers = await getSuggestedusers(token);

    const { posts:feedPosts } = await getTimelinePosts("top", 0, token);

    const user = await getCurrentUser(token);


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

export default withAuth(Home)