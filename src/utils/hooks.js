import { useSelector } from "react-redux"

export function useLoadingIndicator(actionName) {
    const pendingState = useSelector(state=> state.pending)
    return pendingState[actionName]?.pending
  }