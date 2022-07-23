import axios from 'axios'
import Router from 'next/router'
import { removeToken, setToken } from './token'

export const loginUser = async(email,password,setErrorMessage) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,{
            email,
            password
        })
        const {user,token} = res.data
        setToken(token)
        if(user) Router.push('/')
    } catch (error) {
        removeToken()
        setErrorMessage('Invalid Email or Password')
    }
}

