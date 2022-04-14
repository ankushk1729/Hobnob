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
        await Axios.patch(`/${postId}/like`);
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
export const getSinglePost = async (postId,setCurrentPost,setIsPostLiked) => {
    try {
        const post_id = postId.toString()
        const res = await Axios.get(`/${post_id}`)
        setCurrentPost(res.data.post)
        setIsPostLiked(res.data.post.likes.includes(user.username))
    } catch (error) {
        console.log(error)
    }
}

export const commentOnPost = async (postId,commentInput,setCommentInput,setPostComments,setCommentError) => {
    try {
        const res = await Axios.post(`/${postId}/comment`,{text:commentInput})
        setPostComments(prev=>[res.data.comment,...prev])
        setCommentInput('')
        setCommentError('')
    } catch (error) {
        setCommentError('Comment length should be less than 300 characters')
    }
}

export const getPostComments = async (postId,setPostComments,pageNum,setHasMore) => {
    try {
        const res = await Axios.get(`/${postId}/comment?page=${pageNum}`)
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
