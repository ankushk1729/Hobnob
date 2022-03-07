import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import CreatePostModal from './CreatePostModal'
import Post from './Post'
import OptionsModal from "./Options";
import { getTimelinePosts } from "../utils/postActions";
import cookie from 'js-cookie'
import usePagination from "../hooks/usePagination";
import PostLoader from "./PostLoader";



function Feed({ postsData,user,isCreatePostModalOpen,setIsCreatePostModalOpen }) {
  const [isPostCreating, setIsPostCreating] = useState(false)
  const [posts,setPosts] = useState(postsData)
  const [showOptionsModal,setShowOptionsModal] = useState(false)
  const [sort,setSort] = useState('top')
  const [page,setPage] = useState(0)
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const options = ['Top','Recent','Following']

  const { postsError,hasMore } = usePagination({page,sort,setPosts,setIsLoading})


  function toggleModal(){
    setIsCreatePostModalOpen(!isCreatePostModalOpen)
  }
  function toggleOptionsModal(){
    setShowOptionsModal(!showOptionsModal)
  }

  function onOptionSelected(option){
    setShowOptionsModal(false)
    setPosts([])
    setPage(0)
    setIsLoading(true)
    setSort(option.toLowerCase())

  }

  const observer = useRef()
  const lastPostElementRef = useCallback(node=>{
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
        console.log('hello')
        setPage(page=>page+1)
      }
    })
    if(node) observer.current.observe(node)
  },[sort,hasMore])

  useEffect(async()=>{
      if(router.pathname !== '/bookmark'){
        const {posts:posts_} = await getTimelinePosts(sort,0,cookie.get('token'))
        setPosts(posts_)
      }
  },[sort])


  if(isLoading){
    return (
      <main className={` pl-4 pr-0 md:px-12 ${router.pathname === '/bookmark' ? 'py-2':'py-5'}`}>
      {isCreatePostModalOpen && <CreatePostModal toggleModal = {toggleModal} />}
      { router.pathname === '/' &&
      <section className="flex items-center relative px-2">
        <div onClick={toggleModal} className="bg-gray-300 text-gray-500 w-full py-3 mt-2 rounded-md px-3 text-sm">What's on your mind?</div>
      </section>
      }
      {router.pathname !== '/bookmark' && 
        <section className="flex justify-end px-2 relative z-10">
          <p onClick={toggleOptionsModal} className="cursor-pointer bg-white px-2 py-1 mt-3 rounded-sm text-gray-500">{sort[0].toUpperCase() + sort.substring(1)}</p>
          { showOptionsModal &&
          <div className="absolute top-2 right-20">
            <OptionsModal onOptionSelected={onOptionSelected} options={options} handleClose = {toggleOptionsModal} />
          </div>
          }
        </section>
         }
         <PostLoader/>
        </main>
    )
  }


  return (
    <main className={`pl-4 pr-0 md:px-12 ${router.pathname === '/bookmark' ? 'py-2':'py-5'}`}>
      {isCreatePostModalOpen && <CreatePostModal toggleModal = {toggleModal} />}
      { router.pathname === '/' &&
      <section className="flex items-center relative px-2">
        <div onClick={toggleModal} className="bg-gray-300 text-gray-500 w-full py-3 mt-2 rounded-md px-3 text-sm">What's on your mind?</div>
      </section>
      }
      {router.pathname !== '/bookmark' && 
        <section className="flex justify-end px-2 relative z-10">
          <p onClick={toggleOptionsModal} className="cursor-pointer bg-white px-2 py-1 mt-3 rounded-sm text-gray-500">{sort[0].toUpperCase() + sort.substring(1)}</p>
          { showOptionsModal &&
          <div className="absolute top-2 right-20">
            <OptionsModal onOptionSelected={onOptionSelected} options={options} handleClose = {toggleOptionsModal} />
          </div>
          }
        </section>
      }
      <section className = 'py-2 px-2'>
        {posts.map((post,index)=>{
            if(posts.length === index + 1 ){
              return <Post key = {post._id} setPosts = {setPosts} user = {user} post = {post} lastElementRef = {lastPostElementRef} />
            }
            return <Post key = {post._id} setPosts = {setPosts} user = {user} post = {post}/>
          })} 
      </section>
    </main>
  );
}

export default Feed;
