import axios from "axios"
import cookie from 'js-cookie'


const Axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments`,
    headers: { Authorization: `Bearer ${cookie.get("token")}` },
  });

export async function deleteComment(commentId,setPostComments){
    try {
        const res =await Axios.delete(`/${commentId}`)
        setPostComments(prev=>prev.filter(comment=>comment._id !== commentId))
    } catch (error) {
        console.log(error)
    }
}