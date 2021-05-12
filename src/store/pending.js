import { createReducer } from '@reduxjs/toolkit'

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
})

function getActionPrefix(action) {
    let arr = action.type.split('/')
    let actionPrefix = arr[0] + '/' + arr[1]
    return actionPrefix
}

export function getLoadingIndicator(actionName, pendingState) {
    return pendingState[actionName]?.pending
}
