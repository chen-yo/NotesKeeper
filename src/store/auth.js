import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true //try auto login
    },
    reducers: {
        setUser: (state, action) => {
            const user = action.payload
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