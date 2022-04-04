import Feed from "../components/Feed";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

import { parseCookies } from "nookies";

import { useState } from "react";

import { getSavedPosts } from "../utils/postActions";
import { getCurrentUser, getSuggestedusers } from "../utils/userActions";

export default function Bookmark({ suggestedUsers, postsData, user }) {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  return (
    <div className=" flex">
      <LeftSidebar
        user={user}
        isCreatePostModalOpen={isCreatePostModalOpen}
        setIsCreatePostModalOpen={setIsCreatePostModalOpen}
      />
      <div className="w-90% lg:w-58% bg-gray-100 ml-10% md:ml-10% lg:ml-20% overflow-hidden">
        <Feed
          postsData={postsData}
          user={user}
          isCreatePostModalOpen={isCreatePostModalOpen}
          setIsCreatePostModalOpen={setIsCreatePostModalOpen}
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

    const { posts } = await getSavedPosts(0, token);

    console.log(posts)

    const user = await getCurrentUser(token);
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
