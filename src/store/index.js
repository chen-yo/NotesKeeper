import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './auth'
import {notesReducer} from './notes'
import {errorsReducer} from './errors'

export default configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    errors: errorsReducer
  },
})