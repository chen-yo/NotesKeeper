import axios from 'axios'
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { errorsActions, handleErrors2 } from '../../store/errorsSlice'

const localStorageKey = '__notes_keeper_token__'

function getToken() {
    let token = window.localStorage.getItem(localStorageKey)
    return token
}

export const tryAutoLogin = createAsyncThunk('user/tryAutoLogin', async () => {
    const token = getToken()

    if (!token) {
        console.log('Token was not found')
        return Promise.reject()
    }

    let headers = {
        Token: token,
    }

    return axios
        .get('/api/user/me', { headers: headers })
        .then((res) => {
            let user = res.data
            axios.defaults.headers.common['Token'] = user.token
            return user
        })
        .catch((error) => {
            console.error(
                'An error occurred while trying auto login',
                error?.message
            )
        })
})

export const login = createAsyncThunk(
    'user/login',
    ({ email, password }, thunkApi) => {
        thunkApi.dispatch(errorsActions.clearErrors())
        return axios
            .post('/api/user/login', { email, password })
            .then((res) => {
                let user = res.data
                let { token } = user
                window.localStorage.setItem(localStorageKey, token)
                axios.defaults.headers.common['Token'] = user.token
                return user
            })
            .catch((error) => {
                thunkApi.dispatch(errorsActions.setError(error.response.data))
            })
    }
)

export const register = createAsyncThunk('user', (form) => {
    axios
        .post('/api/user/register', form)
        .then((res) => {
            let user = res.data
            let { token } = user
            window.localStorage.setItem(localStorageKey, token)
            axios.defaults.headers.common['Token'] = user.token
            return user
        })
        .catch(handleErrors2)
})

const logoutAction = createAction('user/logout')

export function logout() {
    return dispatch => {
        delete axios.defaults.headers.common['Token']
        window.localStorage.removeItem(localStorageKey)
        dispatch(logoutAction())
    }
}

const slice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    extraReducers: {
        [tryAutoLogin.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [logoutAction]: (state, action) => {
            state.user = null
        },
    },
})

export const userReducer = slice.reducer
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
