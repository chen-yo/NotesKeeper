import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'

// export const notesSlice = createSlice({
//     name: 'notes',
//     initialState: {
//         notes: [],
//     },
//     reducers: {
//         loadNotesSuccess: (state, action) => {
//             state.notes =  action.payload
//         },
//         loadNotesStart: (state, action) => {
//             return state
//         },
//         loadNotesFail: (state, action) => {
//             return state
//         },
//         updateNote: (state, action) => {
//             state.notes.forEach((note, index, arr) => {
//                 if(note.id === action.payload.id) {
//                     arr[index] = {...action.payload}
//                 }
//             })
//         }
//     }
// })

const loadNotesStart = createAction('LOAD_NOTES_START')
const loadNotesFail = createAction('LOAD_NOTES_FAIL')
const loadNotesSuccess = createAction('LOAD_NOTES_SUCCESS')

const loadNoteStart = createAction('LOAD_NOTE_START')
const loadNoteFail = createAction('LOAD_NOTE_FAIL')
const loadNoteSuccess = createAction('LOAD_NOTE_SUCCESS')

const initialState = {
    notes: [],
}

export const notesReducer = createReducer(initialState, (builder) => {
    builder.addCase(loadNotesSuccess, (state, action) => {
        state.notes = action.payload
    })
})

export const notesActions = {
    loadNotesStart,
    loadNotesFail,
    loadNotesSuccess,
    loadNoteStart,
    loadNoteFail,
    loadNoteSuccess,
}
