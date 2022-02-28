import { useRouter } from 'next/router'

function LeftSidebarItem({path,title,route}){
    const router = useRouter()

    return (
        <main className="flex items-center mb-4" onClick={()=>router.push(route)}>
            <div className="rounded-lg grid bg-white place-items-center mr-3 px-1 py-1">
                <a>
            <object
                className={`${title === 'Create' ? 'w-10 h-10':'w-7 h-7'}`}
                type="image/svg+xml"
                data={path}
            >
            </object>
            </a>
            </div>
            <p className="cursor-pointer text-gray-800 hidden md:block">{title}</p>
        </main>
    )
}

export default LeftSidebarItem