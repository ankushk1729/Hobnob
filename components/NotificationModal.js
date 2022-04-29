import { CopyIcon } from "../utils/svgs"

function NotificationModal() {
  return (
    <div className="flex gap-1 items-center h-full w-full">
      <p className="text-sm w-full">Link copied to clipboard</p>   
        <CopyIcon/>
     </div>
  )
}

export default NotificationModal