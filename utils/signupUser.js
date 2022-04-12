import axios from "axios"
import Router  from "next/router"
import { setToken,removeToken } from "./token"

export const signupUser = async({username,email,password,setErrorMessage}) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/auth/register`,{
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