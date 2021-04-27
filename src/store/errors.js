import { createSlice } from '@reduxjs/toolkit'

export const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
       error: null, // validation
       unhandled: null
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        setUnhandled: (state, action) => {
            state.unhandled = action.payload
        }
    }
})

export const errorsActions = errorsSlice.actions
export const errorsReducer = errorsSlice.reducer