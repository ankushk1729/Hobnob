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
    </main>
  );
}

export default Feed;
