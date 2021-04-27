import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        loading: false
    },
    reducers: {
        setNotes: (state, action) => {
            state.notes =  action.payload
            state.loading = false
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer