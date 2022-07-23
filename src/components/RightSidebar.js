import SuggestedList from "./SuggestedList"

function RightSidebar({suggestedUsers,user}){
    return (
        <main className="hidden lg:block w-22% bg-gray-100 h-full px-4 py-4 fixed right-0 top-[50px]">
            <section className="rounded-md shadow-md bg-white px-4 pt-3 pb-2 ">
                <div className="flex justify-between items-center z-10">
                    <p className="text-sm font-bold">Suggested For You</p>
                    <p className="cursor-pointer text-xs text-gray-400">See all</p>
                </div>
                <SuggestedList user = {user} suggestedUsers = {suggestedUsers}/>
            </section>
        </main>
    )
}



export default RightSidebar