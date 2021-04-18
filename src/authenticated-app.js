import React from "react";
import {Navbar, Nav} from 'react-bootstrap'
import Switch from "react-bootstrap/esm/Switch";
import { useAppContext } from "./appdata";
import DisplayNotes from "./screens/DisplayNotes";
import DisplayNote from "./screens/DisplayNote";
import {Redirect, Route, useHistory} from 'react-router-dom'
import AddNote from "./screens/AddNote";
import { NotFoundScreen } from "./screens/NotFoundScreen";

function AuthenticatedApp() {
  const [state, ] = useAppContext()

    return (
      <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <span className="mr-sm-2 text-white">Hello <b>{state.user.name}</b></span>
      </Navbar>
      <div>
      <AppRoutes />
      </div>
    </>
    );
  }

  function AppRoutes() {
    return (
      <Switch>
        <Redirect exact path="/" to="/notes"/>
        <Route path="/notes" exact component={DisplayNotes} />
        <Route path="/notes/add" exact element={<AddNote  />} />
        <Route path="/notes/:noteId" element={<DisplayNote />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Switch>
    )
  }

  export {AuthenticatedApp}