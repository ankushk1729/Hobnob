import axios from "axios"
import cookie from 'js-cookie'


export async function followUnfollowUser(person,setErrorMessage){
    try {
        await axios({
            method:'PATCH',
            url:`${process.env.NEXT_PUBLIC_API_DEV_BASE_URL}/users/${person}/follow`,
            headers:{
                Authorization:`Bearer ${cookie.get('token')}`
            }
        })
    } catch (error) {
        setErrorMessage(error.message)
    }
}