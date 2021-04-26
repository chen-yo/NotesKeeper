import { createSlice } from '@reduxjs/toolkit'
import {setUserToken} from '../utils/api-client'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setLogin: (state, action) => {
            const user = action.payload
            setUserToken(user.email) // as if email act as a token
            state.user =  user
        },
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer