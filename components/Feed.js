import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Post from './Post'
import { getSavedPosts, getTimelinePosts } from "../utils/postActions";
import cookie from 'js-cookie'
import PostLoader from "./PostLoader";
import paginate from "../utils/paginate";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/reducers/createPostReducer";
import { getFeedPosts } from "../utils/postActions";

const CreatePostModal = dynamic(()=>import('../components/CreatePostModal'))

const OptionsModal = dynamic(()=>import('../components/Options'))

function Feed({ postsData,user}) {
  const [isPostCreating, setIsPostCreating] = useState(false)
  const [posts,setPosts] = useState(postsData)
  const [showOptionsModal,setShowOptionsModal] = useState(false)
  const [sort,setSort] = useState('top')
  const [page,setPage] = useState(0)
  const [isLoading,setIsLoading] = useState(false)
  const [hasMore,setHasMore] = useState(true)
  const router = useRouter()
  const options = ['Top','Recent','Following']
  const dispatch = useDispatch()
  const isCreatePostModalOpen = useSelector(state=>state.createPost.value)

  let isProfilePage = router.pathname !== '/' && router.pathname !== '/bookmark'

  const toggleCreatePostModal = () => {
    dispatch(toggleModal())
  }

  const toggleOptionsModal = () => {
    setShowOptionsModal(!showOptionsModal)
  }

  const onOptionSelected = (option) => {
    if(option.toLowerCase() !== sort){
    setShowOptionsModal(false)
    setPosts([])
    setIsLoading(true)
    setSort(option.toLowerCase())
    setPage(0)
    setHasMore(true)
    }
  }

  const observer = useRef()
  const lastPostElementRef = useCallback(node=>{
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
        setPage(page=>page+1)
      }
    },{threshold:0.5})
    if(node) observer.current.observe(node)
  },[sort,hasMore])

  useEffect(async()=>{
      if(router.pathname === '/'){
        const {posts:posts_} = await getTimelinePosts(sort,0,cookie.get('token'))
        setIsLoading(false)
        setPosts(posts_)
      }
  },[sort])

  useEffect(async()=>{
      if(page !== 0){
        const res = await getFeedPosts({page,sort,currentPage:router.pathname,setHasMore,username:router.query.username,token:cookie.get('token')})
        setPosts(posts=>[...posts,...res])
      }
  },[page])


  if(isLoading){
    return (
      <main className={` pl-4 pr-0 md:px-12 ${router.pathname === '/' ? 'py-5':'py-2'}`}>
      {isCreatePostModalOpen && <CreatePostModal toggleModal = {toggleModal} />}
      { router.pathname === '/' &&
      <section className="flex items-center relative px-2">
        <button onClick={toggleCreatePostModal} className=" bg-gray-300 text-gray-500 w-full py-3 mt-2 rounded-md px-3 text-sm">What's on your mind?</button>
      </section>
      }
      {router.pathname === '/' && 
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
    <main className={`pl-4 pr-0 ${!(isProfilePage) ? 'md:px-12': ''} ${router.pathname === '/' ? 'py-5':'py-2'}`}>
      {isCreatePostModalOpen && <CreatePostModal />}
      { router.pathname === '/' &&
      <section className="flex items-center relative px-2">
        <button onClick={toggleCreatePostModal} className="bg-gray-300 text-gray-500 w-full py-3 mt-2 rounded-md px-3 text-sm">What's on your mind?</button>
      </section>
      }
      {router.pathname === '/' && 
        <section className="flex justify-end px-2 relative z-10">
          <p onClick={toggleOptionsModal} className="cursor-pointer bg-white px-2 py-1 mt-3 rounded-sm text-gray-500">{sort[0].toUpperCase() + sort.substring(1)}</p>
          { showOptionsModal &&
          <div className="absolute top-2 right-20">
            <OptionsModal onOptionSelected={onOptionSelected} options={options} handleClose = {toggleOptionsModal} />
          </div>
          }
        </section>
      }
      <section className = {`py-2 ${isProfilePage ? '' : 'px-2'} `}>
        {posts.map((post,index)=>{
            if(posts.length === index + 1 ){
              return <Post key = {post._id} setPosts = {setPosts} user = {user} post = {post} lastElementRef = {lastPostElementRef} />
            }
            return <Post key = {post._id} setPosts = {setPosts} user = {user} post = {post}/>
          })} 
      </section>
      { hasMore &&
      <div className="text-center mt-2" >
            <svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
           </svg>
      </div>
}
    </main>
  );
}

export default Feed;
