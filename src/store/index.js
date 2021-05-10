import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from '../features/user/auth'
import {notesReducer} from './notes'
import {errorsReducer} from './errors'
import { pendingReducer } from './pending'
import useSelector from 'react'


export default configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    errors: errorsReducer,
    pending: pendingReducer
  },
})

