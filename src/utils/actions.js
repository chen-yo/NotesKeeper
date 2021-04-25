import { setUserToken, client} from './api-client'

export function login(dispatch, user) {
    const {email} = user
    setUserToken(email)
    return dispatch({ type: "LOGIN", data: user })
}

export function loadNotes(dispatch, notes) {
    return dispatch({ type: "LOAD_NOTES", data: notes })
}

export function deleteNote(dispatch, noteId) {
    return dispatch({ type: "DELETE_NOTE", data: noteId })
}

export function updateNote(dispatch, note) {
    client('notes')
    dispatch({type: 'UPDATE_NOTE', data: note})
  }