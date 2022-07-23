import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:false
}


const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        toggleNotiModal:state =>{
            state.value = !state.value
        },
        showNotiModal:state =>{
            state.value = true
        },
        hideNotiModal:state =>{
            state.value = false
        }
    }
})

export const { toggleNotiModal, showNotiModal, hideNotiModal } = notificationSlice.actions

export default notificationSlice.reducer;