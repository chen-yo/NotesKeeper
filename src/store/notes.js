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
        },
        updateNote: (state, action) => {
            state.notes.forEach((note, index, arr) => {
                if(note.id === action.payload.id) {
                    arr[index] = {...action.payload}
                }
            })
        }
    }
})

export const notesActions = notesSlice.actions
export const notesReducer = notesSlice.reducer