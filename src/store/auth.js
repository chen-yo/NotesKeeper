import { createSlice } from '@reduxjs/toolkit'
import {setUserToken} from '../utils/api-client'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            const user = action.payload
            setUserToken(user.email) // as if email act as a token
            state.user =  user
            state.loading = false
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer