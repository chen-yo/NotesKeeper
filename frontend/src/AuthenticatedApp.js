import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Redirect, Route, Switch } from 'react-router-dom'
import { NotFoundScreen } from './screens/NotFoundScreen'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AddNote from './features/note/AddNote'
import DisplayNotes from './features/note/DisplayNotes'
import { logout } from './features/user/userSlice'

export default function AuthenticatedApp() {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const { email } = user

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">NotesKeeper</Navbar.Brand>
                <Nav className="mr-auto">
                    <LinkContainer to="/notes">
                        <Nav.Link>Notes</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/notes/add">
                        <Nav.Link>Add</Nav.Link>
                    </LinkContainer>
                </Nav>
                <div className="d-flex align-items-center">
                    <span className="mr-3 text-white">
                        <b>{email}</b>
                    </span>
                    <button
                        type="button"
                        onClick={() => dispatch(logout())}
                        class="btn btn-dark"
                    >
                        <i
                            class="fas fa-sign-out-alt text-white"
                            title="logout"
                        ></i>
                    </button>
                </div>
            </Navbar>
            <div>
                <AppRoutes />
            </div>
        </>
    )
}

function AppRoutes() {
    return (
        <Switch>
            <Redirect exact path="/" to="/notes" />
            <Route path="/notes/add" exact component={AddNote} />
            <Route path="/notes" component={DisplayNotes} />
            <Route path="*" component={NotFoundScreen} />
        </Switch>
    )
}
