import { getCurrentUser, getProfileUser, getUserFollowers, getUserFollowing, getUserPosts } from '../../utils/userActions'
import LeftSidebar from '../../components/LeftSidebar';
import { parseCookies } from "nookies";
import ProfileHeader from '../../components/ProfileContent';
import LeftSidebarMini from '../../components/LeftSidebarMini';
import Feed from '../../components/Feed';
import ProfileFollowers from '../../components/ProfileFollowers'
import withAuth from '../../HOC/withAuth'
import { useRouter } from 'next/router';


 function Profile({profileUser,currentUser,userFollowers,userPosts,isError}) {
    const router = useRouter()
  if(isError){
      router.push('/404')
  }

  return (  
        <div className="w-full flex-col flex lg:flex-row px-4">
            <div className='w-full md:w-30% py-4 md:fixed '>
                <ProfileHeader profileUser = {profileUser} currentUser = {currentUser}/>
                <ProfileFollowers profileUser = {profileUser} userFollowers = {userFollowers} />
            </div>
            <div className='w-full md:w-58% overflow-hidden md:ml-[35%]'>
                <Feed user = {currentUser} postsData = {userPosts} />
            </div>
        </div>
  )
}



export async function getServerSideProps(ctx) {
    try {
        const { token } = parseCookies(ctx);
        
        const { username } = ctx.params
        
        const [profileUser,currentUser,userFollowers,userPostsData] = await Promise.all([
            getProfileUser(token,username),
            getCurrentUser(token),
            getUserFollowers(token,username),
            getUserPosts(token,username,0)
        ])

        console.log(profileUser)
        
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