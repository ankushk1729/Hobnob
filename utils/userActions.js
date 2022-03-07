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
        setUsers(prev=>prev.filter(p=>p.username !== person))
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
        const users = await axios.get(`${process.env.NEXT_PUBLIC_API_DEV_BASE_URL}/users/timelineUsers?count=5`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return users.data.users
    } catch (error) {
        console.log(error)
    }
}