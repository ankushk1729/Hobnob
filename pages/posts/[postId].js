
import { parseCookies } from "nookies";
import cookie from "js-cookie";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getSinglePost } from "../../utils/postActions";
import Post from "../../components/Post";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import { getCurrentUser, getSuggestedusers } from "../../utils/userActions";
import withAuth from "../../HOC/withAuth";

function PostPage({ suggestedUsers,user,post,errorLoading }) {
  const router = useRouter()
  if (errorLoading) {
    return <div className="w-screen h-screen grid place-items-center">Some Server Error Occured</div> 
  }

 
  console.log(post)

  return (
    <div className=" flex">
      <LeftSidebar user={user} />
      <div className="w-90% lg:w-58% bg-gray-100 ml-10% md:ml-10% lg:ml-20% overflow-hidden pb-12">
        <div className="px-4">
            <Post post={post} user = {user} />
        </div>
      </div>
      <RightSidebar user={user} suggestedUsers={suggestedUsers} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { token } = parseCookies(ctx);

    const { postId } = ctx.query
  

    const [suggestedUsers,user,post] = await Promise.all([
      getSuggestedusers(token),
      getCurrentUser(token),
      getSinglePost(postId,token)
    ])



    return {
      props: {
        suggestedUsers,
        user,
        post
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

export default withAuth(PostPage);
