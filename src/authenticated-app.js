import React from "react";
import {Navbar, Nav} from 'react-bootstrap'
import { useAppContext } from "./appdata";

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
    </>
    );
  }

  export {AuthenticatedApp}