import { useRouter } from "next/router";
import { useState } from "react";
import CreatePostModal from './CreatePostModal'
import Post from './Post'


function Feed({ postsData,user }) {
  const [isPostCreating, setIsPostCreating] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [posts,setPosts] = useState(postsData)
  const router = useRouter()
  function toggleModal(){
    setIsCreatePostModalOpen(!isCreatePostModalOpen)
  }


  return (
    <main className={`px-4 md:px-12 ${router.pathname === '/bookmark' ? 'py-2':'py-8'}`}>
      {isCreatePostModalOpen && <CreatePostModal toggleModal = {toggleModal} />}
      { router.pathname === '/' &&
      <section className="flex items-center relative px-2">
        <div onClick={toggleModal} className="bg-gray-200 text-gray-500 w-full py-3 mt-2 rounded-md px-2 text-sm">What's on your mind ?</div>
      </section>
      }
      <section className = 'py-4 px-2'>
        {posts.map((post)=>(
            <Post setPosts = {setPosts} user = {user} post = {post}/>
        ))} 
      </section>
    </main>
  );
}

export default Feed;
