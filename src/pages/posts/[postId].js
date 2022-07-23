
import { parseCookies } from "nookies";

import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

import Head from "next/head";
import NotificationModal from "../../components/Modals/NotificationModal";
import PostLikesModal from "../../components/Modals/PostLikesModal";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import ProfileHeader from "../../components/Profile/ProfileContent";
import RightSidebar from "../../components/RightSidebar";
import withAuth from "../../HOC/withAuth";
import { getSinglePost } from "../../utils/postActions";
import { getCurrentUser, getSuggestedusers } from "../../utils/userActions";

function PostPage({ suggestedUsers,user,post,errorLoading }) {
  const router = useRouter()
  const isNotificationModalOpen = useSelector(state=>state.notification.value)
  const isPostLikesModalOpen = useSelector(state=>state.postLikesModal.open)


  if (errorLoading) {
    return <div className="w-screen h-screen grid place-items-center">Some Server Error Occured</div> 
  }

 
  console.log(post)

  return (
    <main>
      <Head>
        <title>Post</title>
      </Head>
      {isPostLikesModalOpen && <PostLikesModal/>}
      <Navbar user={user} />
    <div className="flex mt-12">
    <div className='hidden lg:block md:w-1/5 py-4 md:fixed px-4 top-[50px]'>
                <ProfileHeader profileUser = {user} currentUser = {user}/>
            </div>
      <div className="w-full lg:w-58% bg-gray-100 lg:ml-20% overflow-hidden pb-12">
        <div className="px-12">
            <Post post={post} user = {user} />
        </div>
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
