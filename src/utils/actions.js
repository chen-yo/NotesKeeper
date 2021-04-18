import { setUserToken} from './api-client'

export function login(dispatch, user) {
    const {email} = user
    setUserToken(email)
    return dispatch({ type: "LOGIN", data: user })
}

