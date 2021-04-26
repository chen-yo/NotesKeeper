import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        isLoading: false
    },
    reducers: {
        setNotes: (state, action) => {
            state.notes =  action.payload
        },
    }
})

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer