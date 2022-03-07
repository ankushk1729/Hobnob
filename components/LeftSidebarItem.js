import Image from 'next/image'
import { useRouter } from 'next/router'

function LeftSidebarItem({path,title,route}){
    const router = useRouter()

    return (
        <main className="flex items-center mb-4" >
            <div className="rounded-lg grid bg-white place-items-center mr-3 px-1 py-1 cursor-pointer">
            <img
                onClick={()=>router.push(route)}
                src={path}
                className={`${title === 'Create' ? 'w-10 h-10':'w-7 h-7'}`}
                type="image/svg+xml"
            >
            </img>
            </div>
            <p 
            onClick={()=>router.push(route)}
            className="cursor-pointer text-gray-800 hidden lg:block">{title}</p>
        </main>
    )
}

export default LeftSidebarItem