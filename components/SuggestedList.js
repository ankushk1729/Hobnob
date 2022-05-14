import Image from "next/image"
import Link from 'next/link'
import { useState } from "react"
import {followUnfollowUser} from '../utils/userActions'
import {useRouter}  from 'next/router'


function SuggestedList({suggestedUsers,user}){
    const [errorMessage,setErrorMessage] = useState('')
    const [users,setUsers] = useState(suggestedUsers)
    const router = useRouter()
    async function follow(person){
        await followUnfollowUser(person,setErrorMessage,setUsers)
    }

    return (
        <div className="mt-4">
            {users.length > 0 && users.map(person=>(
                <div key={person.username} className="cursor-pointer items-center flex mb-3 justify-between">
                    <Link href={`/profile/${person.username}`}>
                        <div className="flex items-center">
                            <Image className="rounded-full object-cover" width='50' height ='50' src={person.profilePhoto}/>
                            <div className="flex flex-col justify-center ml-3">
                                <p className="text-xs font-medium ">{person.username}</p>
                                <p className="text-xs"><span className="text-xs mr-1">{person.followersCount}</span>Followers</p>
                            </div>
                        </div>
                    </Link>
                    <button onClick={()=>follow(person.username)} className="px-2 py-1 bg-blue text-white text-xs rounded-md">{user.following.includes(person.username)? 'Followed':'Follow'}</button>
                </div> 
            ))}
        </div>
    )
}   


export default SuggestedList