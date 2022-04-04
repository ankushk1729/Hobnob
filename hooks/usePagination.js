import { useEffect, useState } from "react";
import { getSavedPosts, getTimelinePosts } from "../utils/postActions";
import cookie from "js-cookie";

 export default function usePagination({page,sort,setPosts,setIsLoading,currentPage,posts}){
     const [postsError,setPostsError] = useState('')
     const [hasMore,setHasMore] = useState(true)
     useEffect(async()=>{
         try {
            // let resPosts = []
            if(currentPage === '/'){
                 const res = await getTimelinePosts(sort,page,cookie.get('token'))
                //  resPosts = res.posts
                 setHasMore(res.hasMore)

                 setPosts(prev=>[...prev,...res.posts])
                }
                if(currentPage === '/bookmark'){
                    const res = await getSavedPosts(page,cookie.get('token'))
                    // resPosts = res.posts
                    let finalRes = [...posts,...res.posts]
                    finalRes = finalRes.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
                    setHasMore(res.hasMore)
                    setPosts(finalRes)
                }
            setIsLoading(false)
        } catch (error) {
            setPostsError(error)
        }
     },[page,sort])
     return {
         postsError,
         hasMore
     }
 }