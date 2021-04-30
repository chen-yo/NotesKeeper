import { logDOM } from "@testing-library/react";
import * as React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "./components/logo";
import { login, register } from "./store/auth-actions"; //add the login part

function LoginForm({ onSubmit, submitButton }) {
  const {error} = useSelector((state) => state.errors);

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    onSubmit({
      email: email.value,
      password: password.value,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" id="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          id="password"
        />
      </Form.Group>
      <div>
        {React.cloneElement(
          submitButton,
          { type: "submit" },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children])
        )}
      </div>
      {error ? <span>{JSON.stringify(error)}</span> : null}
    </Form>
  );
}

function UnauthenticatedApp() {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = React.useState(true);

  const handleToggle = () => {
    setShowLogin(p=>(!p))
  
  }
  const handleRegister = (form) => {
    dispatch(register(form))
  }



  let content = null;

  if (showLogin) {
    content = (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm
            onSubmit={(form) => dispatch(login(form))}
            submitButton={<Button variant="secondary">Login</Button>}
          ></LoginForm>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" class="btn btn-link" onClick={handleToggle}>Register</button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  } else {
    content = (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm
            onSubmit={handleRegister}
            submitButton={<Button variant="secondary">Register</Button>}
          ></LoginForm>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" class="btn btn-link" onClick={handleToggle}>Login</button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Notes Keeper</h1>
      <div>
        {content}
      </div>
    </div>
  );
}

export { UnauthenticatedApp };
