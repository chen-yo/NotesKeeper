import { setUserToken} from './api-client'

export function login(dispatch, user) {
    const {email} = user
    setUserToken(email)
    return dispatch({ type: "LOGIN", data: user })
}

export function loadNotes(dispatch, notes) {
    return dispatch({ type: "LOAD_NOTES", data: notes })
}