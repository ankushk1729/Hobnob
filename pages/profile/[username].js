import { getCurrentUser, getProfileUser, getUserFollowers, getUserFollowing, getUserPosts } from '../../utils/userActions'
import { parseCookies } from "nookies";
import ProfileHeader from '../../components/ProfileContent';
import Feed from '../../components/Feed';
import ProfileFollowers from '../../components/ProfileFollowers'
import Navbar from '../../components/Navbar'
import withAuth from '../../HOC/withAuth'
import { useRouter } from 'next/router';
import { useEffect } from 'react';


 function Profile({profileUser,currentUser,userFollowers,userPosts,isError}) {
    const router = useRouter()
  if(isError){
      router.push('/404')
  }

  return (  
      <main>
          <Navbar user={currentUser}/>
        <div className="w-full flex-col flex lg:flex-row px-4 mt-8">
            <div className='w-full md:w-30% py-4 md:fixed top-[50px]'>
                <ProfileHeader profileUser = {profileUser} currentUser = {currentUser}/>
                <ProfileFollowers profileUser = {profileUser} userFollowers = {userFollowers} />
            </div>
            <div className='w-full md:w-58% overflow-hidden md:ml-[35%]'>
                <Feed user = {currentUser} postsData = {userPosts} />
            </div>
        </div>
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