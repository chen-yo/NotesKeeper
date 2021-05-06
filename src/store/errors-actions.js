import {errorsActions} from './errors'
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