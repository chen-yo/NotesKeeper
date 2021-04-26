import React from "react";
import {Navbar, Nav} from 'react-bootstrap'
import DisplayNotes from "./screens/DisplayNotes";
import {Redirect, Route, NavLink, Link, Switch} from 'react-router-dom'
import AddNote from "./screens/AddNote";
import { NotFoundScreen } from "./screens/NotFoundScreen";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";



function AuthenticatedApp() {
  const user = useSelector(state => state.auth.user)
  const {name} = user

    return (
      <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/notes">
            <Nav.Link>My Notes</Nav.Link>
          </LinkContainer>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <span className="mr-sm-2 text-white">Hello <b>{name}</b></span>
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
        <Route path="/notes/add" exact component={AddNote} />
        <Route path="/notes" component={DisplayNotes} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    )
  }

  export {AuthenticatedApp}