import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './auth'
import {notesReducer} from './notes'

export default configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer
  },
})