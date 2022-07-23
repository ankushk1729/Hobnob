import cookie from "js-cookie";
import { getSavedPosts, getTimelinePosts } from "../utils/postActions";

 export default async function paginate({page,sort,setPosts,setIsLoading,currentPage,setHasMore}){
            let resPosts = []
            if(currentPage === '/'){
                 const res = await getTimelinePosts(sort,page,cookie.get('token'))
                 resPosts = res.posts
                 setHasMore(res.hasMore)

                //  setPosts(prev=>[...prev,...res.posts])
                }
                else if(currentPage === '/bookmark'){
                    const res = await getSavedPosts(page,cookie.get('token'))
                    resPosts = res.posts
                    setHasMore(res.hasMore)
                    // setPosts(prev=>[...prev,...res.posts])
                }
            setIsLoading(false)
     return {
         resPosts
     }
 }