import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './auth'
import {notesReducer} from './notes'
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