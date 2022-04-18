import LeftSidebarItem from "./LeftSidebarItem";
import Image from "next/image";
import {useRouter} from 'next/router'
import { useDispatch } from "react-redux";
import {toggleModal} from '../redux/reducers/createPostReducer'

function LeftSidebar({user}) {
  const dispatch = useDispatch()

  const router = useRouter()

  const moveToProfile = () => {
    if(router.pathname.startsWith('/profile')) return
    router.push(`/profile/${user.username}`)
  }

  return (
    <section className=" top-0 fixed  flex w-full z-20 bg-white">
      <article className="px-4 lg:px-6 py-2   flex items-center w-full">
        <div className="w-10%"></div>
        <div className="w-4/5 flex items-center justify-center">
          <LeftSidebarItem currentPage='home' path="/home-icon.svg" title="Home" route="/" />
          <LeftSidebarItem currentPage='home' path="/bookmark-icon.svg" title="Saved" route="/bookmark" />
        </div>
        <div onClick={moveToProfile} className="cursor-pointer flex items-center border border-1 px-2 py-1 rounded-2xl ml-4"> 
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
          <p className='text-md ml-2'>{user.username}</p>
        </div>
      </article>
    </section>
  );
}

export default LeftSidebar;
