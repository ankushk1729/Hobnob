import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:false
}


const createPostModalSlice = createSlice({
    name:'createPost',
    initialState,
    reducers:{
        toggleModal:state =>{
            state.value = !state.value
        },
        showCreatePostModal:state =>{
            state.value = true
        },
        hideCreatePostModal:state =>{
            state.value = false
        }
    }
})

export const { toggleModal,showCreatePostModal,hideCreatePostModal } = createPostModalSlice.actions

export default createPostModalSlice.reducer;