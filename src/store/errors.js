import { createSlice } from '@reduxjs/toolkit'

export const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
       error: {}, // validation
       unhandled: null
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        setUnhandled: (state, action) => {
            state.unhandled = action.payload
        },
        clearErrors: (state) => {
            state.error = {}
        }
    }
})

export const errorsActions = errorsSlice.actions
export const errorsReducer = errorsSlice.reducer