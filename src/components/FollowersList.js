import Image from "next/image"
import { useState } from "react"



function FollowersList({usersList}){
    const [errorMessage,setErrorMessage] = useState('')
    
    return (
        <div className={`mt-4 grid ${usersList.length < 3 ? 'grid-cols-2' : 'grid-cols-3'} place-items-center`}>
            {usersList.length > 0 && usersList.map(person=>(
                
                    <div key={person._id} className="flex-col items-center">
                        <Image className="rounded-lg object-cover" width='40' height ='40' src={person.profilePhoto}/>
                        <p className="text-center text-xs font-medium ">{person.username}</p>
                    </div>
            ))}
        </div>
    )
}   


export default FollowersList