import axios from "axios"
import cookie from "js-cookie";

export const uploadPic = async (file) => {
    try {
        const form = new FormData()
        form.append('image',file)
        const res = await axios({
            method:'POST',
            url:`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload?dest=post-images`,
            data:form,
            headers:{
                Authorization: `Bearer ${cookie.get("token")}`,
                'Content-Type':'multipart/form-data'
            }
        })
        return res.data.image.src
    } catch (error) {
        console.log(error)
    }
}