import { configureStore } from '@reduxjs/toolkit'
import createPostReducer from './reducers/createPostReducer'

export const store = configureStore({
    reducer:{
        createPost:createPostReducer
    }
})