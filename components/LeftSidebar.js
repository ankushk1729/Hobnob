import LeftSidebarItem from "./LeftSidebarItem";
import Image from "next/image";

function LeftSidebar({user,isCreatePostModalOpen,setIsCreatePostModalOpen}) {
  return (
    <section className="w-10% lg:w-20% min-w-[70px]  h-full fixed">
      <article
        style={{ backgroundImage: `url(/profile-bg2.jpg)` }}
        className="bg-no-repeat bg-cover h-10% lg:h-30% px-2 py-4 lg:px-6"
      >
        <div className="lg:flex lg:flex-col lg:justify-between h-full">
          <div className="rounded-lg py-2 px-2 w-full bg-white shadow-lg hidden lg:flex items-center">
            <object
              data="/search-icon.svg"
              type="image/svg+xml"
              className="h-4 w-4"
            ></object>
            <input
              type="text"
              className="ml-1 text-sm rounded-lg outline-none w-full"
              placeholder="search"
            ></input>
          </div>
          <div className="flex items-center">
            <div className="relative shadow-2xl rounded-xl  w-10 h-10 lg:w-12 lg:h-12 border-2 border-white">
            <Image
              layout="fill"
              objectFit="cover"
              src={user.profilePhoto}
              className="rounded-xl"
            ></Image>
            </div>
            <p className="ml-2 text-sm text-white font-bold shadow-xl hidden lg:block">
              {user.username}
            </p>
          </div>
        </div>
      </article>
      <article className="px-4 lg:px-6 py-6 bg-white h-90% lg:h-70% flex flex-col justify-between">
        <div>
          <LeftSidebarItem path="/home-icon.svg" title="Home" route="/" />
          <LeftSidebarItem path="/bookmark-icon.svg" title="Saved" route="/bookmark" />
          <LeftSidebarItem path="/profile.svg" title="Profile" route="/" />
          <div className="flex items-center mb-4 cursor-pointer" onClick={()=>setIsCreatePostModalOpen(!isCreatePostModalOpen)}>
            <div className="rounded-lg grid bg-white place-items-center mr-3 px-1 py-1">
                <svg stroke="rgb(255,165,0)" fill="rgb(255,165,0)" strokeWidth="0" viewBox="0 0 448 512" height="27px" width="27px" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            </div>
            <p className="text-gray-800 hidden lg:block">Create</p>
        </div>
        </div>
        <div className="flex items-center bg-white rounded-xl py-2 px-2">
          <img src="/settings-logo.png" className="w-5 h-5"></img>
          <p className="ml-3 text-sm text-gray-800 hidden lg:block">Settings</p>
        </div>
      </article>
    </section>
  );
}

export default LeftSidebar;
