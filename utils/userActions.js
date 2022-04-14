import axios from "axios"
import cookie from 'js-cookie'


export async function followUnfollowUser(person,setErrorMessage,setUsers){
    try {
        await axios({
            method:'PATCH',
            url:`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${person}/follow`,
            headers:{
                Authorization:`Bearer ${cookie.get('token')}`
            }
        })
        setUsers && setUsers(prev=>prev.filter(p=>p.username !== person))
    } catch (error) {
        setErrorMessage(error.message)
    }
}

export const getCurrentUser = async (token) => {
    try {
        const userData = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/currentUser`,{
            headers:{
              Authorization:`Bearer ${token}`
          }})
          return userData.data.user
    } catch (error) {
        console.log(error)
    }
}


export const getSuggestedusers = async (token) => {
    try {
        const users = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/timelineUsers?count=5`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return users.data.users
    } catch (error) {
        console.log(error)
    }
}


export const getUserFollowers = async (token,user) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user}/followers`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data.followers

    } catch (error) {
        console.log(error)
    }
}

export const getUserFollowing = async (token,user) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user}/following`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data.following

    } catch (error) {
        console.log(error)
    }
}

export const getProfileUser = async (token,username) => {
    try {
        const userData = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}`,{
            headers:{
              Authorization:`Bearer ${token}`
          }})
          return userData.data.user
    } catch (error) {
        console.log(error)
    }
}


export const getUserPosts = async (token,username,page) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/posts?page=${page}`,{
            headers:{
              Authorization:`Bearer ${token}`
          }})
        return { posts:res.data.posts,hasMore:res.data.hasMore }
    } catch (error) {
        console.log(error)
    }
}


export const updateProfile = async ({coverPhoto,profilePhoto,bio,token}) => {
    try {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/updateProfile`,{coverPhoto,bio,profilePhoto},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}