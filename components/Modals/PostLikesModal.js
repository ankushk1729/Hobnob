import { useEffect, useState } from "react";
import { getPostLikes } from "../../utils/postActions";
import { useSelector,useDispatch } from 'react-redux'
import { hidePostLikesModal } from '../../redux/reducers/PostLikesReducer'
import Image from "next/image";
import { CloseIcon } from "../../utils/svgs";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRouter } from 'next/router'



function PostLikesModal() {
  const [likes, setLikes] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  const postId = useSelector(state=>state.postLikesModal.postId)
  const router = useRouter()

  const modalCloseHandler = () => {
    dispatch(hidePostLikesModal())
  }

  const pushToProfile = (username) => {
    router.push(`/profile/${username}`)
}

  const modalRef = useClickOutside(modalCloseHandler)

  const dispatch = useDispatch()

  useEffect(async () => {
    const likes_ = await getPostLikes(postId);
    setIsLoading(false)
    setLikes(likes_);
  },[]);

  const PostsData = () => {
    if(isLoading){
        return (
          <div className="text-center mt-8" >
              <svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
          </div>
        )
    }
      return (
        <div className="px-3 py-4">
            { likes.map((like)=>(
                    <div key={like.username} onClick={()=>pushToProfile(like.username)} className="flex items-center gap-2 mb-4">
                        <Image className="rounded-full object-cover" width='50' height ='50' src={like.profilePhoto}/>
                        <p className="-mt-1 text-semibold">{like.username}</p>
                    </div>
            ))
            }
        </div>
      )
  }

  console.log(likes)

  

  return (
    <div
      className="fixed z-20 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div ref={modalRef} className="h-[500px] inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-2 pb-4 sm:p-4 sm:pb-4">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex items-center justify-between">
                <h3
                  className="text-lg leading-6 text-gray-900 font-semibold border-b-1"
                  id="modal-title"
                >
                  Post Likes
                </h3>
                <button onClick={modalCloseHandler}>
                    <CloseIcon/>
                </button>
              </div>
              <PostsData/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostLikesModal;
