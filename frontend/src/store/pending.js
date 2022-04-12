import { createReducer } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const pendingReducer = createReducer({}, (builder) => {
    builder
        .addMatcher(
            ({ type }) => type.endsWith('/pending'),
            (state, action) => {
                let actionPrefix = getActionPrefix(action)
                state[actionPrefix] = true
            }
        )
        .addMatcher(
            ({ type }) => type.endsWith('/fulfilled'),
            (state, action) => {
                let actionPrefix = getActionPrefix(action)
                state[actionPrefix] = false
            }
        )
        .addMatcher(
            ({ type }) => type.endsWith('/rejected'),
            (state, action) => {
                let actionPrefix = getActionPrefix(action)
                state[actionPrefix] = false
            }
        )
        .addMatcher(
            ({ type }) => type.endsWith('_START'),
            (state, action) => {
                let actionName = getActionName(action.type)
                state[actionName] = true
            }
        )
        .addMatcher(
            ({ type }) => type.endsWith('_FAIL'),
            (state, action) => {
                let actionName = getActionName(action.type)
                state[actionName] = false
            }
        )
        .addMatcher(
            ({ type }) => type.endsWith('_SUCCESS'),
            (state, action) => {
                let actionName = getActionName(action.type)
                state[actionName] = false
            }
        )
})

function getActionPrefix(action) {
    let arr = action.type.split('/')
    let actionPrefix = arr[0] + '/' + arr[1]
    return actionPrefix
}

function getActionName(actionType) {
    if (typeof actionType !== 'string') {
      return null;
    }
   
    return actionType
      .split("_")
      .slice(0, -1)
      .join("_");
   }

export function getLoadingIndicator(actionName, pendingState) {
    return pendingState[actionName]?.pending
}

export function useLoadingForAsyncThunk(asyncThunk) {
    const pending = useSelector((state) => state.pending)
    let isLoading = pending[asyncThunk.typePrefix] ?? false
    return isLoading
}

export function useLoadingForPlainAction(actionName) {
    const pendingState = useSelector((state) => state.pending)
    let isLoading = pendingState[actionName] ?? false
    return isLoading
}
