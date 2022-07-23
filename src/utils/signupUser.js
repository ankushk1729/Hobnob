import axios from "axios"
import Router from "next/router"
import { removeToken, setToken } from "./token"

export const signupUser = async({username,email,password,setErrorMessage}) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,{
            email,
            password,
            username
        })
        const {user,token} = res.data
        setToken(token)
        Router.push('/')
    } catch (error) {
        removeToken()
        if(error.response.status === 400)
            setErrorMessage('Email id already exists')
        else
            setErrorMessage('Something went wrong with the server, try again later')
    }
}