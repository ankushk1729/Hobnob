import { configureStore } from '@reduxjs/toolkit'
import createPostReducer from './reducers/createPostReducer'
import notificationReducer from './reducers/notificationReducer'
import PostLikesReducer from './reducers/PostLikesReducer'

export const store = configureStore({
    reducer:{
        createPost:createPostReducer,
        notification:notificationReducer,
        postLikesModal:PostLikesReducer
    }
})