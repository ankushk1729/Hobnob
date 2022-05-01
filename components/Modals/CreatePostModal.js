import { useRef,useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModal } from '../../redux/reducers/createPostReducer'
import { createPost } from '../../utils/postActions'
import { uploadPic } from '../../utils/uploadPic'
import { useClickOutside } from '../../hooks/useClickOutside'
import { hideCreatePostModal } from '../../redux/reducers/createPostReducer'

function CreatePostModal({token}){
    const [file,setFile] = useState(null)
    const postTextRef = useRef(null)
    const imageRef = useRef(null)
    const [errorMessage,setErrorMessage] = useState('')
    const dispatch = useDispatch()

    const modalCloseHandler = () => {
      dispatch(hideCreatePostModal())
    }
 
    const modalRef = useClickOutside(modalCloseHandler)

    function getImgData(file) {
      
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
            imageRef.current.src = this.result
        })    
    }

    const handleSubmit = async() => {
      const body = postTextRef.current.value

      if(!file && !body) {
        setErrorMessage("Both text and image file can't be empty")
        return
      }
      let imgUrl = ''
      if(file){
        imgUrl = await uploadPic(file)
      }
      createPost({image:imgUrl,body})
      togglePostModal()
    }
    return (
        <div className="fixed z-20 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          
          <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      
          <div ref={modalRef} className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 text-gray-900 font-semibold" id="modal-title">Create Post</h3>
                  <div className="mt-2 w-full">
                    <textarea ref={postTextRef} className="resize-none outline-none border border-1 px-2 py-1 w-full h-32 text-sm" placeholder="What's on your mind?"></textarea>
                    <div>
                        <label className="h-1 w-1" htmlFor="image-upload">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                        </label>
                        <input accept="image/*" onChange={(e)=>{
                          setFile(e.target.files[0])
                          getImgData(e.target.files[0])
                        }} className="hidden" type='file' id="image-upload"></input>
                    </div>
                    {file && <img className= 'object-contain border border-dotted border-4 m-auto w-1/2 h-32' ref = {imageRef} src=""></img>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
              <button onClick={modalCloseHandler} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreatePostModal