import { parseCookies } from "nookies";
import Feed from '../../components/Feed';
import NotificationModal from "../../components/Modals/NotificationModal";
import Navbar from '../../components/Navbar';
import ProfileHeader from '../../components/Profile/ProfileContent';
import ProfileFollowers from '../../components/Profile/ProfileFollowers';
import { getCurrentUser, getProfileUser, getUserFollowers, getUserPosts } from '../../utils/userActions';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import PostLikesModal from '../../components/Modals/PostLikesModal';
import withAuth from '../../HOC/withAuth';



 function Profile({profileUser,currentUser,userFollowers,userPosts,isError}) {
    const isNotificationModalOpen = useSelector(state=>state.notification.value)
    const isPostLikesModalOpen = useSelector(state=>state.postLikesModal.open)

    const router = useRouter()
  if(isError){
      router.push('/404')
  }

  return (  
      <main>
          <Head>
            <title>Profile - {profileUser.username}</title>
           </Head>
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