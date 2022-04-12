import { notesActions } from './notes'
import { errorsActions, handleErrors2 } from '../../store/errorsSlice'
import axios from 'axios'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function getNotes() {
    return async (dispatch) => {
        dispatch(notesActions.loadNotesStart())
      
            axios
                .get('/api/notes')
                .then((res) => {
                    dispatch(notesActions.loadNotesSuccess(res.data))
                })
                .catch((error) => {
                    dispatch(notesActions.loadNotesFail())
                    dispatch(errorsActions.setUnhandled(error))
                })
      
    }
}

export function loadNote(noteId) {
    return dispatch => {
        dispatch(notesActions.loadNoteStart())
        return axios
                .get(`/api/notes/${noteId}`)
                .then((res) => {
                    let note = res.data
                    dispatch(notesActions.loadNoteSuccess())
                    return note
                })
                .catch((error) => {
                    dispatch(notesActions.loadNoteFail())
                    dispatch(errorsActions.setUnhandled(error))
                })
    }
}

export function deleteNote(noteId) {
    return async (dispatch) => {
        dispatch(notesActions.deleteNoteStart())
        axios.delete(`/api/notes/${noteId}`).then(()=> {
            dispatch(notesActions.deleteNoteSuccess(noteId))
        }).catch((error)=>{
            dispatch(notesActions.deleteNoteFail(noteId))
            dispatch(errorsActions.setUnhandled(error))
        }) 
    }
}

export function updateNote(note) {
    return (dispatch) => {
        dispatch(notesActions.updateNoteStart())
        dispatch(errorsActions.clearErrors())
        return axios
            .put('/api/notes', note)
            .then((res) => {
                let note = res.data
                dispatch(notesActions.updateNoteSuccess(note))
            })
            .catch(error => {
                dispatch(notesActions.updateNoteFail())
                dispatch(handleErrors2(error))
            })
    }
}

export function addNote(note) {
    return dispatch => {
        dispatch(notesActions.addNoteStart())
        axios.post('/api/notes', note).then(note => {
            dispatch(notesActions.addNoteSuccess(note))
        }).catch(error => {
            dispatch(notesActions.addNoteFail())
            handleErrors2(error)
        })
    }
}
