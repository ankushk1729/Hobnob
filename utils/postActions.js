import axios from 'axios'
import cookie from 'js-cookie'
import { getUserPosts } from './userActions';

const Axios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,
    headers: { Authorization:`Bearer ${cookie.get("token")}`}});

export const createPost = async({image,body}) => {
    try {
        const res = await Axios.post('/',{image,body})
    } catch (error) {
        console.log(error)
    }
}

export const likeDislikePost = async (postId,username,setLikes,like=true) => {
    try {
         await axios({
            method:'PATCH',
            url:`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`,
            headers:{
                Authorization:`Bearer ${cookie.get('token')}`
            }
        })
        if (like) {
          setLikes((prev) => [...prev, username]);
        } else if (!like) {
          setLikes((prev) => prev.filter((like) => like !== username));
        }
      } catch (error) {
        console.log(error)
      }
}

export const savePost = async (postId,setSavedPosts,save = true) => {
    try {
        await Axios.post(`/${postId}/save`);
        if(save){
            setSavedPosts(prev=>[...prev,postId])
        }
        else if(!save) {
            setSavedPosts(prev=>prev.filter(post=>post !== postId))
        }
    } 
    catch (error) {
        
    }
}
export const getSinglePost = async (postId,token) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data.post
    } catch (error) {
        console.log(error)
    }
}

export const commentOnPost = async (postId,commentInput,setCommentInput,setPostComments,setCommentError,token) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comment`,{text:commentInput},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setPostComments(prev=>[res.data.comment,...prev])
        setCommentInput('')
        setCommentError('')
    } catch (error) {
        setCommentError('Comment length should be less than 300 characters')
    }
}

export const getPostComments = async (postId,setPostComments,pageNum,setHasMore,token) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comment?page=${pageNum}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setPostComments(prev=>[...prev,...res.data.comments])
        setHasMore(res.data.hasMore)
    } catch (error) {
        console.log(error)
    }
}

export const getSavedPosts = async (page,token) => {
    try {
        const savedPostsData = await Axios.get(`/savedPosts?page=${page}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return {posts:savedPostsData.data.posts,hasMore:savedPostsData.data.hasMore}
    } catch (error) {
        console.log(error)
    }
}

export const getTimelinePosts = async (sort,page,token) => {
    try {
        const postsData = await Axios.get(`/timeline?sort=${sort}&page=${page}`,{
            headers:{
              Authorization:`Bearer ${token}`
          }})
        return {posts:postsData.data.posts,hasMore:postsData.data.hasMore}

    } catch (error) {
        console.log(error)
    }
}

export async function getFeedPosts({page,sort,setIsLoading,currentPage,setHasMore,username}){
    try {
        if(currentPage == '/'){
           const {posts,hasMore} = await getTimelinePosts(sort,page,cookie.get('token'))
           setHasMore(hasMore)
           return posts
        }
        else if(currentPage == '/bookmark'){
           const {posts,hasMore} = await getSavedPosts(page,cookie.get('token'))
           setHasMore(hasMore)
           return posts
       }
       else {
           const { posts,hasMore } = await getUserPosts(cookie.get('token'),username,page)
           setHasMore(hasMore)
           console.log(posts)
           return posts
       }
       setIsLoading(false)
    } catch (error) {
        return []
    }
}


export const deletePost = async (postId) => {
    try {
        await Axios.delete(`/${postId}`)
    } catch (error) {
        console.log(error)
    }
}

export const getPostLikes = async (postId) => {
    try {
        const tempLikes = await axios.get(`${process.env.NEXT_PUBLIC_API_DEV_BASE_URL}/posts/${postId}/likes`,{
            headers:{
                Authorization:`Bearer ${cookie.get('token')}`
            }
        })
        console.log(tempLikes)
        return tempLikes.data.likes
    } catch (error) {
        console.log(error)
    }
}