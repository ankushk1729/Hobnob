import { useEffect, useState } from "react";
import { getTimelinePosts } from "../utils/postActions";
import cookie from "js-cookie";

 export default function usePagination({page:pageNum,sort,setPosts,setIsLoading}){
     const [postsError,setPostsError] = useState('')
     const [hasMore,setHasMore] = useState(true)

     useEffect(async()=>{
        try {
            const {posts,hasMore:more} = await getTimelinePosts(sort,pageNum,cookie.get('token'))
            setIsLoading(false)
            setPosts(prev=>[...prev,...posts])
            setHasMore(more)
        } catch (error) {
            setPostsError(error)
        }
     },[pageNum,sort])
     return {
         postsError,
         hasMore
     }
 }