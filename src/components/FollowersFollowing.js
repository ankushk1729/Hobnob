import cookie from 'js-cookie'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import { followUnfollowUser, getCurrentUser, getUserFollowers } from "../utils/userActions"


function FollowersFollowing({followers,user}) {
    const router = useRouter()
    const [followersList,setFollowersList] = useState(followers)
    const [currentUser,setCurrentUser] = useState(user)
    const [hasMore,setHasMore] = useState(true)
    const [page,setPage] = useState(0)
  


    const follow = async (person) => {
        await followUnfollowUser(person)
        const followers_ = await getUserFollowers(cookie.get('token'),router.query.username)
        setFollowersList(followers_)
        const user_ = await getCurrentUser(cookie.get('token'))
        setCurrentUser(user_)
    }
    let isCurrentUser = router.query.username === user.username

    const observer = useRef()
    const lastPostElementRef = useCallback(node=>{
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting && hasMore){
            setPage(page=>page+1)
        }
        },{threshold:0.5})
        if(node) observer.current.observe(node)
    },[hasMore])


    useEffect(async()=>{
        if(page !== 0){
          const res = await getUserFollowers(cookie.get('token'),router.query.username,page,setHasMore)
          setFollowersList(followers=>[...followers,...res])
        }
    },[page])

  return (
    <div className="w-full py-4">
        <p className="text-xl mb-4 font-medium" >{isCurrentUser ? 'Your followers':`${router.query.username}'s followers`}</p>
        {
            followersList.map((follower,index)=>{
                if(followersList.length === index + 1){
                    return (
                        <div key={follower.username} className="bg-white cursor-pointer items-center flex mb-3 justify-between px-4 py-2 rounded-lg" ref={lastPostElementRef}>
                            <Link href={`/profile/${follower.username}`}>
                                <div className="flex items-center">
                                    <Image className="rounded-full object-cover" width='50' height ='50' src={follower.profilePhoto}/>
                                    <div className="flex flex-col justify-center ml-3">
                                        <p className="text-xs font-medium ">{follower.username === currentUser.username ? 'You' : follower.username}</p>
                                        <p className="text-xs"><span className="text-xs mr-1">{follower.followersCount}</span>Followers</p>
                                    </div>
                                </div>
                            </Link>
                            {follower.username !== currentUser.username && <button onClick={()=>follow(follower.username)} className="px-2 py-1 bg-blue text-white text-xs rounded-md">{currentUser.following.includes(follower.username)? 'Followed':'Follow'}</button>}
                    </div> 
                    ) 
                }
                return (
                <div key={follower.username} className="bg-white cursor-pointer items-center flex mb-3 justify-between px-4 py-2 rounded-lg">
                    <Link href={`/profile/${follower.username}`}>
                        <div  className="flex items-center">
                            <Image className="rounded-full object-cover" width='50' height ='50' src={follower.profilePhoto}/>
                            <div className="flex flex-col justify-center ml-3">
                                <p className="text-xs font-medium ">{follower.username === currentUser.username ? 'You' : follower.username}</p>
                                <p className="text-xs"><span className="text-xs mr-1">{follower.followersCount}</span>Followers</p>
                            </div>
                        </div>
                    </Link>
                    {follower.username !== currentUser.username && <button onClick={()=>follow(follower.username)} className="px-2 py-1 bg-blue text-white text-xs rounded-md">{currentUser.following.includes(follower.username)? 'Followed':'Follow'}</button>}
            </div> 
            )
            })
        }
    </div>
  )
}

export default FollowersFollowing