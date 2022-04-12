import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import { useDispatch, useSelector } from 'react-redux'
import { NotifyError } from './components/NotifyError'
import { tryAutoLogin } from './features/user/userSlice'
import { useLoadingForAsyncThunk } from './store/pending'
import FullPageSpinner from './components/FullPageSpinner'

function App() {
    const { user } = useSelector((state) => state.user)
    let isLoading = useLoadingForAsyncThunk(tryAutoLogin)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(tryAutoLogin())
    }, [dispatch])

    if (isLoading) {
        return <FullPageSpinner text="Trying to auto login..." />
    }

    return user ? (
        <Router>
            <AuthenticatedApp />
            <NotifyError />
        </Router>
    ) : (
        <>
            <NotifyError />
            <UnauthenticatedApp />
        </>
    )
}

export { App }
