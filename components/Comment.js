import React from 'react'
import Image from 'next/image'


function Comment({comment}) {

  return (
    <section className='px-4 flex gap-2 mt-2 '>
         <div className='relative w-5% h-8 mr-1'>
            <Image src={comment.user_[0].profilePhoto} layout='fill' objectFit='cover' className='rounded-full' />
        </div>
        <p className='font-bold w-5%'>{comment.user}</p>
        <p className='w-90%'>{comment.text} </p>
    </section>
  )
}

export default Comment