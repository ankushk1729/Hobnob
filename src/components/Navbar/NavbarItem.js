import Link from 'next/link'
import { useRouter } from 'next/router'

function NavbarItem({path,title,route,currentPage}){
    const router = useRouter()

    return (
        <main className={`flex items-center h-full mr-4`} >
            <div data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" className={`${router.pathname === route ? 'border-b-2 border-b-grey' : ''}  grid bg-white place-items-center mr-3 px-1 py-1 cursor-pointer`}>
            <Link href = {route}>
                <a>
                    <img
                        src={path}
                        className={`${title === 'Create' ? 'w-10 h-10':'w-7 h-7'}`}
                        type="image/svg+xml"
                    >
                    </img>
                </a>
            </Link>
            </div>
            <div id="tooltip-bottom" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Tooltip on bottom
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            
        </main>
    )
}

export default NavbarItem