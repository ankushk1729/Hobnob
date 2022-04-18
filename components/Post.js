import {CommentIcon,HeartIcon,BookmarkIcon,FilledHeartIcon,FilledBookmarkIcon,SendIcon} from '../utils/svgs'
import Image from 'next/image'
import {useState,useRef,useEffect} from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import {commentOnPost, likeDislikePost,savePost,getPostComments}  from '../utils/postActions'
import { deleteComment } from '../utils/commentActions'
import {useRouter} from 'next/router'

import dynamic from 'next/dynamic'

const Comment = dynamic(()=>import('../components/Comment'))

function Post({ post,user,setPosts,lastElementRef }) {
    const router = useRouter()
    const [showComments,setShowComments] = useState(false)
    const [postComments,setPostComments] = useState([])
    const [postLikes,setPostLikes] = useState(post.likes)
    const [savedPosts,setSavedPosts] = useState(user.savedPosts)
    const [commentInput,setCommentInput] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const [commentError,setCommentError] = useState('')
    const [commentPage,setCommentPage] = useState(0)
    const [hasMore,setHasMore] = useState(false)


    let liked = postLikes.includes(user.username)
    let saved = savedPosts.includes(post._id)

    const goToProfile = () => {
        router.push(`/profile/${post.createdBy}`)
    }

    function configSavePost(){
        savePost(post._id,setSavedPosts,saved?false:true)
        if(router.pathname === '/bookmark'){
            setPosts(posts=>posts.filter(p=>p._id !== post._id))
        }
    }

    function commentOnAPost(){
        if(commentInput === ''){
            setCommentError(`Comment can't be empty`)
            return
        }
        commentOnPost(post._id,commentInput,setCommentInput,setPostComments,setCommentError)
    }

    async function getComments(page){
        setCommentError('')
        setCommentInput('')
        getPostComments(post._id,setPostComments,page?page:commentPage,setHasMore)
    }
    const onCommentOptionSelected = async (commentId) => {
        await deleteComment(commentId,setPostComments)
     }

   const loadComments = () => {
        if(showComments){
            return
       }
       getComments()
       setShowComments(true)
   }

   const goToPostPage = () => {
       if(router.pathname.startsWith('/posts')) return
       router.push(`/posts/${post._id}`)
   }

  return (
    <div   className="bg-white rounded-lg py-4 mt-6 relative" ref = {lastElementRef}>
        <header className='flex items-center mb-2 px-2'>
                <div onClick={goToProfile} className='relative w-12 h-12 mr-2 cursor-pointer'>
                    <Image src={post.user[0].profilePhoto} layout='fill' objectFit='cover' className='rounded-full' />
                </div>
                <p onClick={goToProfile} className='font-bold cursor-pointer'>{post.createdBy}</p>
        </header>
        <p onClick={goToPostPage} className='px-2 mb-2 cursor-pointer'>{post.body}</p>
        {post.image && 
        <div onClick={goToPostPage} className='relative w-full h-80 cursor-pointer'>
            <Image 
             blurDataURL="URL"
             placeholder="blur"
             src={post.image} layout='fill' objectFit='cover' />
        </div>
            }
        <section className='flex justify-between mt-3 px-2'>
            <div className='flex gap-2'>
                <div className='cursor-pointer' onClick={()=>likeDislikePost(post._id,user.username,setPostLikes,liked ? false : true)}>
                    {
                        liked?
                        <FilledHeartIcon/>:
                        <HeartIcon/>
                        }
                </div>
                <div className='cursor-pointer' onClick={loadComments}>
                    <CommentIcon/>
                </div>
            </div>
                <div className='cursor-pointer' onClick={configSavePost}>
                    {    saved ?
                        <FilledBookmarkIcon/>:
                        <BookmarkIcon/>
                    }   
                </div>
        </section>

        {postLikes.length > 0 &&
        <section className='px-2 mt-2'>
            <p>Liked by <span className='font-bold'>{postLikes[0] === user.username ? 'You':postLikes[0]}</span>{postLikes.length-1 > 0 && ` and ${postLikes.length-1} others`}</p>
        </section>
        }

        {showComments && hasMore > 0 &&  <button onClick={()=>{setCommentPage(prev=>prev+1);getComments(commentPage+1)}} className='absolute bottom-2 -translate-x-1/2 left-1/2 text-xs' >Load more comments</button>}
        {showComments &&
        <div>
            <section className=' px-2  mt-2 border-b pb-3'>
                <div className='flex gap-1 items-center'>
                    <div className='relative w-8 h-8 mr-2'>
                        <Image src={user.profilePhoto} layout='fill' objectFit='cover' className='rounded-full' />
                    </div>
                    <input value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} className='mr-1 flex-1 border border-1 rounded-md h-8 text-sm px-2 outline-none' placeholder='Add your comment'>
                    </input>
                    <button className='cursor-pointer' onClick = {commentOnAPost}>
                    <SendIcon />
                    </button>
                </div>
                <p className='mt-1 px-4 text-sm text-red-500 text-center'>{commentError}</p>
            </section>
            <p className='px-4 font-bold mt-2'>Comments</p>
            <div className='mt-2'>
                {postComments.map((comment)=>(
                    <Comment key={comment._id} comment = {comment} user = {user} onOptionSelected = {onCommentOptionSelected} />
                ))
                }
            </div>
        </div>
        }
    </div>
  )
}

export default Post