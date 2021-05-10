import { configureStore } from '@reduxjs/toolkit'
import { notesReducer } from '../features/note/notes'
import {authReducer} from '../features/user/auth'
import {errorsReducer} from './errors'
import { pendingReducer } from './pending'


export default configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    errors: errorsReducer,
    pending: pendingReducer
  },
})

