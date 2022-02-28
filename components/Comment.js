import React from 'react'
import Image from 'next/image'

function Comment({comment}) {
  return (
    <section className='px-4 flex gap-2 mt-2 items-center'>
         <div className='relative w-8 h-8 mr-1'>
            <Image src={comment.user_[0].profilePhoto} layout='fill' objectFit='cover' className='rounded-full' />
        </div>
        <p className='font-bold text-xs'>{comment.user}</p>
        <p className='text-xs'>{comment.text} </p>
    </section>
  )
}

export default Comment