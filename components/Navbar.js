import NavbarItem from "./NavbarItem";
import Image from "next/image";
import {useRouter} from 'next/router'
import { useDispatch } from "react-redux";
import {toggleModal} from '../redux/reducers/createPostReducer'
import { ExitIcon } from "../utils/svgs";
import { logoutUser } from "../utils/userActions";

function LeftSidebar({user}) {
  const dispatch = useDispatch()

  const router = useRouter()

  const moveToProfile = () => {
    if(router.pathname.startsWith('/profile')) return
    router.push(`/profile/${user.username}`)
  }

  const logout = () => {
    logoutUser(router)
  }

  const pushToHomePage = () => {
    if(router.pathname === '/') return
    router.push('/')
  }

  return (
    <section className=" top-0 fixed  flex w-full z-20 bg-white">
      <article className="px-4 lg:px-6 py-2   flex items-center w-full">
        <div className="w-10%">
           <p onClick={pushToHomePage} className="text-lg font-semibold px-3 cursor-pointer hidden md:block">Hobnob</p>
           <button onClick={pushToHomePage} className="w-7 h-7 relative block md:hidden px-3">
             <Image src = '/favicon.ico' layout="fill" />
           </button>
        </div>
        <div className="w-4/5 flex items-center justify-center">
          <NavbarItem currentPage='home' path="/home-icon.svg" title="Home" route="/" />
          <NavbarItem currentPage='home' path="/bookmark-icon.svg" title="Saved" route="/bookmark" />
        </div>
        <div onClick={moveToProfile} className="cursor-pointer flex items-center border border-1 px-2 py-1 rounded-2xl ml-4 h-full"> 
          <div className={`w-8 h-8 relative`}>
                <Image
                  src={user.profilePhoto}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  blurDataURL="URL"
                  placeholder="blur"
                />
            </div>
          <div className="h-full w-[1px] ml-2 bg-slate-200"></div>
          <div onClick={logout} className="ml-2">
            <ExitIcon/>
          </div>
        </div>
      </article>
    </section>
  );
}

export default LeftSidebar;
