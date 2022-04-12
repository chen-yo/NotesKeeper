import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'
import { deleteNote } from './notes-actions'

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

const deleteNoteStart = createAction('DELETE_NOTE_START')
const deleteNoteFail = createAction('DELETE_NOTE_FAIL')
const deleteNoteSuccess = createAction('DELETE_NOTE_SUCCESS')

const addNoteStart = createAction('ADD_NOTE_START')
const addNoteFail = createAction('ADD_NOTE_FAIL')
const addNoteSuccess = createAction('ADD_NOTE_SUCCESS')

const updateNoteStart = createAction('UPDATE_NOTE_START')
const updateNoteFail = createAction('UPDATE_NOTE_FAIL')
const updateNoteSuccess = createAction('UPDATE_NOTE_SUCCESS')



const initialState = {
    notes: [],
}

export const notesReducer = createReducer(initialState, (builder) => {
    builder.addCase(loadNotesSuccess, (state, action) => {
        state.notes = action.payload
    })
    .addCase(deleteNoteSuccess, (state, action) => {
        let noteId = action.payload
        let index = state.notes.findIndex((note) => note.id === noteId)
        state.notes.splice(index, 1)
    })
    .addCase(updateNoteSuccess, (state, action) => {
        let noteId = action.payload.id
        let index = state.notes.findIndex((note) => note.id === noteId)
        state.notes[index] = action.payload
    })
})

export const notesActions = {
    loadNotesStart,
    loadNotesFail,
    loadNotesSuccess,
    loadNoteStart,
    loadNoteFail,
    loadNoteSuccess,
    deleteNoteStart,
    deleteNoteFail,
    deleteNoteSuccess,
    addNoteStart,
    addNoteFail,
    addNoteSuccess,
    updateNoteStart,
    updateNoteFail,
    updateNoteSuccess
}
