import LeftSidebarItem from "./LeftSidebarItem";
import Image from "next/image";

function LeftSidebarMini({user,isCreatePostModalOpen,setIsCreatePostModalOpen}) {
  return (
    <section className="min-w-[60px]  h-16 lg:h-full lg:fixed">
      <article className="px-4  py-6 bg-white h-full flex lg:flex-col items-center lg:items-start lg:justify-between">
        <div className="flex items-center lg:block justify-center w-90% lg:w-full gap-4">
          <LeftSidebarItem currentPage = 'profile' path="/home-icon.svg" title="Home" route="/" />
          <LeftSidebarItem currentPage = 'profile' path="/bookmark-icon.svg" title="Saved" route="/bookmark" />
          <LeftSidebarItem currentPage = 'profile' path="/profile.svg" title="Profile" route={`/profile/${user.username}`} />
          <div className="flex items-center cursor-pointer" onClick={()=>setIsCreatePostModalOpen(!isCreatePostModalOpen)}>
            <div className="rounded-lg grid bg-white place-items-center mr-3 px-1 py-1 ">
                <svg className="w-[24px] " stroke="rgb(255,165,0)" fill="rgb(255,165,0)" strokeWidth="0" viewBox="0 0 448 512"  xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            </div>
            <p className="text-gray-800 hidden">Create</p>
        </div>
        </div>
        <div className="flex items-center bg-white rounded-xl py-2 px-2">
          <img src="/settings-logo.png" className="w-5 h-5"></img>
        </div>
      </article>
    </section>
  );
}

export default LeftSidebarMini;
