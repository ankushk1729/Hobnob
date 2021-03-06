import Link from 'next/link'
import { useRouter } from "next/router"
import FollowersList from "../FollowersList"

function ProfileFollowers({userFollowing,userFollowers,profileUser}){
    const router = useRouter()
 
    return (
            <main className="w-full bg-gray-100 py-4">
                <section className="rounded-md shadow-md bg-white px-4 pt-3 pb-2 ">
                    <div className="flex justify-between items-center z-10">
                        <p className="text-sm font-bold">Followers &#xb7; {profileUser.followersCount}</p>
                        <Link href={`/followers/${profileUser.username}`}>
                            <p className="cursor-pointer text-xs text-gray-400">See all</p>
                        </Link>
                    </div>
                    <FollowersList  usersList = {userFollowers}/>
                </section>
            </main>        
    )
}



export default ProfileFollowers