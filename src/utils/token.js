import axios from 'axios'
import cookie from 'js-cookie'

export const setToken = (token) => {
    cookie.set('token',token)    
}

export const removeToken = () => {
    cookie.remove('token')
}

export const verifyToken = async ( token ) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-token`,{
            token
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}