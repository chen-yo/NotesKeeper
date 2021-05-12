import { configureStore } from '@reduxjs/toolkit'
import { notesReducer } from '../features/note/notes'
import { userReducer } from '../features/user/userSlice'
import {errorsReducer} from './errorsSlice'
import { pendingReducer } from './pending'


export default configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    errors: errorsReducer,
    pending: pendingReducer
  },
})

