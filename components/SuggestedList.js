import Image from "next/image"
import { useState } from "react"
import {followUnfollowUser} from '../utils/userActions'


function SuggestedList({suggestedUsers,user}){
    const [errorMessage,setErrorMessage] = useState('')
    async function follow(person){
        await followUnfollowUser(person,setErrorMessage)
    }
    return (
        <div className="mt-4">
            {suggestedUsers.map(person=>(
                <div key={person.username} className="cursor-pointer items-center flex mb-3 justify-between">
                    <div className="flex items-center">
                        <Image className="rounded-full object-cover" width='50' height ='50' src={person.profilePhoto}/>
                        <p className="text-xs font-medium ml-3">{person.username}</p>
                    </div>
                    <button onClick={()=>follow(person.username)} className="px-2 py-1 bg-green-400 text-white text-xs rounded-md">{user.following.includes(person.username)? 'Followed':'Follow'}</button>
                </div> 
            ))}
        </div>
    )
}   


export default SuggestedList