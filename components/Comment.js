import React from 'react'
import Image from 'next/image'
import {ThreeDotsIcon} from '../utils/svgs'
import { useState } from 'react'
import OptionsModal from './Options'


function Comment({comment,user,onOptionSelected}) {
  const [showCommentOptionsModal,setShowCommentOptionsModal] = useState(false)

  function toggleCommentOptionsModal(){
    setShowCommentOptionsModal(!showCommentOptionsModal)
  }

  return (
    <section className='px-4 flex gap-2 mt-2 '>
         <div className='relative w-5% h-8 mr-1'>
            <Image src={comment.user_[0].profilePhoto} layout='fill' objectFit='cover' className='rounded-full' />
        </div>
        <p className='font-bold w-5%'>{comment.user}</p>
        <p className='w-90%'>{comment.text} </p>
        {comment.user === user.username && 
          <div className='cursor-pointer' onClick={()=>setShowCommentOptionsModal(!showCommentOptionsModal)}>
            <ThreeDotsIcon/>
            </div>
        }
        <div className='relative z-10'>
        { showCommentOptionsModal &&
          <div className="absolute top-0 right-10">
            <OptionsModal commentId = {comment._id} onOptionSelected={onOptionSelected} options={['Delete']} handleClose = {toggleCommentOptionsModal} />
          </div>
          }
          </div>
    </section>
  )
}

export default Comment