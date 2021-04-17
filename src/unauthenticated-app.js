import * as React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Logo } from "./components/logo";
import { useAsync } from "./utils/hooks";

function LoginForm({ onSubmit, submitButton }) {
  const { isLoading, isError, error, run } = useAsync();
  function handleSubmit(event) {
    event.preventDefault();
    const {email, password} =  event.target.elements;

    run(
      onSubmit({
        email: email.value,
        password: password.value,
      })
    );

    
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" id="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" id="password"/>
      </Form.Group>
      <div>
        {React.cloneElement(
          submitButton,
          { type: "submit" },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <span>Loading</span> : null
        )}
      </div>
      {isError ? <span>Error occured</span> : null}
    </Form>
  );
}

function UnauthenticatedApp({ login, register }) {

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Notes Keeper</h1>
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="secondary">Login</Button>}
            ></LoginForm>
          </Modal.Body>

          {/* <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer> */}
        </Modal.Dialog>

        {/* <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal> */}
      </div>
    </div>
  );
}

export { UnauthenticatedApp };
