import ProfileFollowersFollowing from "./ProfileFollowersFollowing"
import SuggestedList from "./SuggestedList"

function ProfileRightSidebar({userFollowing,userFollowers,user}){
    return (
            <main className="hidden lg:block w-22% bg-gray-100 h-full px-4 py-4 fixed right-0 top-0">
                <section className="rounded-md shadow-md bg-white px-4 pt-3 pb-2 ">
                    <div className="flex justify-between items-center z-10">
                        <p className="text-sm font-bold">Followers &#xb7; {userFollowers.length}</p>
                        <p className="cursor-pointer text-xs text-gray-400">See all</p>
                    </div>
                    <ProfileFollowersFollowing user = {user} usersList = {userFollowers}/>
                </section>
            </main>        
    )
}



export default ProfileRightSidebar