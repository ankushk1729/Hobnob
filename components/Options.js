import React from 'react'

function OptionsModal({options,onOptionSelected,handleClose,commentId}) {
    function handleClick(e){
        if(e.target !== e.currentTarget) return
        handleClose()
    }
    
  return (
      <>
        <div onClick={handleClick} className='fixed top-0 left-0 w-screen h-screen z-4'>

        </div>
        <ul className='shadow-sm relative bg-white w-32 border-2 border-gray rounded-lg px-4 z-2 top-0 py-2 flex flex-col gap-2'>
            {
                options?.map((option,index)=>(
                    <li 
                        className='cursor-pointer'
                        key={index}
                        onMouseDown={()=>onOptionSelected(commentId?commentId:option)}
                    >
                        {option}
                    </li>
                ))
            }
        </ul>
      </>
  )
}

export default OptionsModal