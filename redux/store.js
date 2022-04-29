import { configureStore } from '@reduxjs/toolkit'
import createPostReducer from './reducers/createPostReducer'
import notificationReducer from './reducers/notificationReducer'

export const store = configureStore({
    reducer:{
        createPost:createPostReducer,
        notification:notificationReducer
    }
})