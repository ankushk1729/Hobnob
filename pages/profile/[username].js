import { getCurrentUser, getProfileUser, getUserFollowers, getUserFollowing, getUserPosts } from '../../utils/userActions'
import { parseCookies } from "nookies";
import ProfileHeader from '../../components/ProfileContent';
import Feed from '../../components/Feed';
import ProfileFollowers from '../../components/ProfileFollowers'
import Navbar from '../../components/Navbar'
import NotificationModal from "../../components/Modals/NotificationModal";

import withAuth from '../../HOC/withAuth'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import PostLikesModal from '../../components/Modals/PostLikesModal';



 function Profile({profileUser,currentUser,userFollowers,userPosts,isError}) {
    const isNotificationModalOpen = useSelector(state=>state.notification.value)
    const isPostLikesModalOpen = useSelector(state=>state.postLikesModal.open)

    const router = useRouter()
  if(isError){
      router.push('/404')
  }

  return (  
      <main>
          {isPostLikesModalOpen && <PostLikesModal/>}
          <Navbar user={currentUser}/>
        <div className="w-full flex-col flex lg:flex-row px-4 mt-12 md:mt-8">
            <div className='w-full md:w-30% py-4 md:fixed top-[50px]'>
                <ProfileHeader profileUser = {profileUser} currentUser = {currentUser}/>
                <ProfileFollowers profileUser = {profileUser} userFollowers = {userFollowers} />
            </div>
            <div className='w-full md:w-58% overflow-hidden md:ml-[35%]'>
                <Feed user = {currentUser} postsData = {userPosts} />
            </div>
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
        
        const { username } = ctx.params
        
        const [profileUser,currentUser,userFollowersTemp,userPostsData] = await Promise.all([
            getProfileUser(token,username),
            getCurrentUser(token),
            getUserFollowers(token,username,0),
            getUserPosts(token,username,0)
        ])

        const userFollowers = userFollowersTemp.slice(0,3)
        
        return {
            props:{
                profileUser,
                currentUser,
                userFollowers,
                userPosts:userPostsData.posts
            }
        };
    } catch (error) {
        return {
            props:{isError:true}
        }
    }
}

export default withAuth(Profile) 