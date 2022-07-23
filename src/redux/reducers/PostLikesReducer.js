import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open:false,
    postId:null
}


const PostLikesSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        togglePostLikesModal:state =>{
            state.open = !state.open
        },
        showPostLikesModal:state =>{
            state.open = true
        },
        hidePostLikesModal:state =>{
            state.open = false
        },
        setPostId:(state,action)=>{
            state.postId = action.payload.postId
            state.open = true
        }

    }
})

export const { togglePostLikesModal,hidePostLikesModal,showPostLikesModal,setPostId } = PostLikesSlice.actions

export default PostLikesSlice.reducer;