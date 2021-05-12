import { createSlice } from '@reduxjs/toolkit'
/*
import {errorsActions} from './errorsSlice'
import store from './index'

export function handleErrors(error) {
    let errorJson = error?.response?.data;
    // check if its validation error, if so dispatch error to handle by global error reducer
    if (errorJson?.type === "validation") {
      store.dispatch(errorsActions.setError(errorJson.errorFields));
    } else {
      store.dispatch(errorsActions.setUnhandled(error));
    }
  }

  export function handleErrors2(error, dispatch) {
    let errorJson = error?.response?.data;
    // check if its validation error, if so dispatch error to handle by global error reducer
    if (errorJson?.type === "validation") {
      dispatch(errorsActions.setError(errorJson.errorFields));
    } else {
      dispatch(errorsActions.setUnhandled(error));
    }
  }
*/
export const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
       error: {}, // validation
       unhandled: null
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        },
        setUnhandled: (state, action) => {
            state.unhandled = action.payload
        },
        clearErrors: (state) => {
            state.error = {}
        }
    }
})

export function handleErrors2(error) {
  return (dispatch) => {
    let errorJson = error?.response?.data;
    // check if its validation error, if so dispatch error to handle by global error reducer
    if (errorJson?.type === "validation") {
      dispatch(errorsActions.setError(errorJson.errorFields));
    } else {
      dispatch(errorsActions.setUnhandled(error));
    }
  };
}

export const errorsActions = errorsSlice.actions
export const errorsReducer = errorsSlice.reducer