import Feed from "../components/Feed";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";

import { parseCookies } from "nookies";
import { useState } from "react";
import { getSuggestedusers, getCurrentUser } from "../utils/userActions";
import { getTimelinePosts } from "../utils/postActions";

export default function Home({
  suggestedUsers,
  postsData,
  user,
  errorLoading,
}) {
  if (errorLoading) {
    return <div>No Ingles</div>
  }
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  return (
    <div className=" flex">
      <LeftSidebar
        user={user}
        isCreatePostModalOpen={isCreatePostModalOpen}
        setIsCreatePostModalOpen={setIsCreatePostModalOpen}
      />
      <div className="w-90% md:w-58% bg-gray-100 ml-10% md:ml-20%">
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

    const feedPosts = await getTimelinePosts("top", 0, token);

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
