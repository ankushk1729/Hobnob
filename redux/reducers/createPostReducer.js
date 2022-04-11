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
        }
    }
})

export const { toggleModal } = createPostModalSlice.actions

export default createPostModalSlice.reducer;