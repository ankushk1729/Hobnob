import Feed from "../components/Feed";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

import { parseCookies } from "nookies";

import { useState } from "react";

import { getSavedPosts } from "../utils/postActions";
import { getCurrentUser, getSuggestedusers } from "../utils/userActions";

import withAuth from "../HOC/withAuth";

function Bookmark({ suggestedUsers, postsData, user }) {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  console.log(postsData)
  return (
    <div className=" flex">
      <LeftSidebar
        user={user}
        isCreatePostModalOpen={isCreatePostModalOpen}
        setIsCreatePostModalOpen={setIsCreatePostModalOpen}
      />
      <div className="w-90% lg:w-58% bg-gray-100 ml-10% md:ml-10% lg:ml-20% overflow-hidden">
        {postsData.length > 0 ?  
        <Feed
          postsData={postsData}
          user={user}
          isCreatePostModalOpen={isCreatePostModalOpen}
          setIsCreatePostModalOpen={setIsCreatePostModalOpen}
        /> : 
        <p className="flex justify-center py-4 text-xl">No Saved Posts</p>
        } 
      </div>
      <RightSidebar user={user} suggestedUsers={suggestedUsers} />
    </div>
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