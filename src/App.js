import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthenticatedApp from './AuthenticatedApp'
import UnauthenticatedApp from './UnauthenticatedApp'
import { useDispatch, useSelector } from 'react-redux'
import { NotifyError } from './components/NotifyError'
import { tryAutoLogin } from './features/user/userSlice'

function App() {
    const { user, status } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(tryAutoLogin())
    }, [dispatch])

    if (status === 'idle' || status === 'pending') {
        return <span>Trying auto login...{status}</span>
    }

    // if(status === 'rejected') {
    //   return <span>An error occurred</span>
    // }
    return user ? (
        <Router>
            <span>Logged</span>
            {/* <AuthenticatedApp />
      <NotifyError /> */}
        </Router>
    ) : (
        <>
            <NotifyError />
            <UnauthenticatedApp />
        </>
    )
}

export { App }
