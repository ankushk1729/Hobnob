import {useState} from 'react'
import { getCurrentUser, getProfileUser, getUserFollowers, getUserFollowing } from '../../utils/userActions'
import LeftSidebar from '../../components/LeftSidebar';
import { parseCookies } from "nookies";
import ProfileHeader from '../../components/ProfileContent';
import LeftSidebarMini from '../../components/LeftSidebarMini';
import ProfileRightSidebar from '../../components/ProfileRightSidebar';


export default function Profile({profileUser,currentUser,userFollowers,userFollowing}) {

  return (  
        <div className="w-full flex-col flex lg:flex-row lg:justify-between">
            <LeftSidebarMini user={currentUser}  />
            <div className='w-full lg:w-70% lg:ml-28 mt-5 px-4'>
                <ProfileHeader profileUser = {profileUser} currentUser = {currentUser} />
            </div>
            <div className='h-screen'>
                <ProfileRightSidebar userFollowing = {userFollowing} userFollowers = {userFollowers} />
            </div>
        </div>
  )
}

export async function getServerSideProps(ctx) {
    try {
        const { token } = parseCookies(ctx);

        const profileUser = await getProfileUser(token,ctx.params.username)

        const currentUser = await getCurrentUser(token)

        const userFollowers = await getUserFollowers(token,ctx.params.username)

        const userFollowing = await getUserFollowing(token,ctx.params.username)

        return {
            props:{
                profileUser,
                currentUser,
                userFollowers,
                userFollowing
            }
        };
    } catch (error) {
        return {
            props:{isError:true}
        }
    }
}
