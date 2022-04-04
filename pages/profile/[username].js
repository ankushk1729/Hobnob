import {useState} from 'react'
import { getProfileUser, getUserFollowers } from '../../utils/userActions'
import LeftSidebar from '../../components/LeftSidebar';
import { parseCookies } from "nookies";
import ProfileHeader from '../../components/ProfileContent';
import LeftSidebarMini from '../../components/LeftSidebarMini';
import ProfileRightSidebar from '../../components/ProfileRightSidebar';


export default function Profile({user,userFollowers}) {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  return (  
        <div className="w-full flex-col flex lg:flex-row lg:justify-between">
            <LeftSidebarMini user={user} isCreatePostModalOpen = {isCreatePostModalOpen} setIsCreatePostModalOpen = {setIsCreatePostModalOpen} />
            <div className='w-full lg:w-70% lg:ml-28 mt-5 px-4'>
                <ProfileHeader user = {user} />
            </div>
            <ProfileRightSidebar userFollowers = {userFollowers} />
        </div>
  )
}

export async function getServerSideProps(ctx) {
    try {
        const { token } = parseCookies(ctx);

        const user = await getProfileUser(token,ctx.params.username)

        const userFollowers = await getUserFollowers(token,ctx.params.username)

        return {
            props:{
                user,
                userFollowers
            }
        };
    } catch (error) {
        return {
            props:{isError:true}
        }
    }
}
