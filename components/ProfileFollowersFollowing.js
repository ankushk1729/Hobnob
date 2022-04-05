import Image from "next/image"
import { useState,useEffect } from "react"

import {followUnfollowUser} from '../utils/userActions'


function ProfileFollowersFollowing({usersList,user}){
    const [errorMessage,setErrorMessage] = useState('')
    const [users,setUsers] = useState(usersList)
    // if(!users) return <></>
    return (
        <div className={`mt-4 grid ${users.length < 3 ? 'grid-cols-2' : 'grid-cols-3'} place-items-center`}>
            {users.length > 0 && users.map(person=>(
                
                    <div className="flex-col items-center">
                        <Image className="rounded-lg object-cover" width='50' height ='50' src={person.profilePhoto}/>
                        <p className="text-center text-xs font-medium ">{person.username}</p>
                    </div>
            ))}
        </div>
    )
}   


export default ProfileFollowersFollowing