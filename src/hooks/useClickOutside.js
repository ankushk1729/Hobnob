import { useEffect, useRef } from "react"

export const useClickOutside = (handler) => {
    let domNode = useRef()

    useEffect(()=>{
        let handlerWrapper = (event) => {
            if(!domNode.current?.contains(event.target)){
                handler()

            }
        }
        document.addEventListener("mousedown",handlerWrapper)

        return ()=>{
            document.removeEventListener("mousedown",handlerWrapper)
        }
    },[])

    return domNode
}