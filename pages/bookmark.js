import Feed from '../components/Feed'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'

import axios from "axios"
import { parseCookies } from "nookies"

export default function Bookamrk({suggestedUsers,postsData,user}) {
  
  return (
    <div className=" flex">
      <LeftSidebar user = {user} />
      <div className='w-90% md:w-58% bg-gray-50 ml-10% md:ml-20%'>
        <Feed postsData = {postsData} user = {user}/>
      </div>
      <RightSidebar suggestedUsers = {suggestedUsers} />
    </div>
  )
}


export async function getServerSideProps(ctx){
  try {
      const { token } = parseCookies(ctx)
      const rightSidebarUsers = await axios.get(`${process.env.NEXT_PUBLIC_API_DEV_BASE_URL}/users/timelineUsers`,{
          headers:{
              Authorization:`Bearer ${token}`
          }
      })
      const suggestedUsers = rightSidebarUsers.data.users
      const savedPostsData = await axios.get(`${process.env.NEXT_PUBLIC_API_DEV_BASE_URL}/posts/savedPosts`,{
      headers:{
        Authorization:`Bearer ${token}`
    }})

    const savedPosts = savedPostsData.data.posts
    const userData = await axios.get(`${process.env.NEXT_PUBLIC_API_DEV_BASE_URL}/users/currentUser`,{
      headers:{
        Authorization:`Bearer ${token}`
    }})
    const user = userData.data.user
      return {
          props:{
            suggestedUsers,
            postsData:savedPosts,
            user
          }
      }
  } catch (error) {
    return {
      props :{
        errorMessage:'Not working'
      }
    }    
  }
  
}
