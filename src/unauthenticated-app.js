import { logDOM } from "@testing-library/react";
import * as React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "./components/logo";
import {login} from './store/auth-actions' //add the login part

function LoginForm({ onSubmit, submitButton, isLoading }) {
  const {error} = useSelector(state=>state.errors)

  function handleSubmit(event) {
    event.preventDefault();
    const {email, password} =  event.target.elements;
      onSubmit({
        email: email.value,
        password: password.value,
      })
  }

  return (
 
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        {console.log('LoginForm is loading', isLoading)}
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
      {error ? <span>{error.message}</span> : null}
    </Form>
  );
}

function UnauthenticatedApp() {
  const [state, setState] = React.useState({form: null, run: false, isLoading: false})
  const dispatch = useDispatch()

  const {form,isLoading, run } = state

  React.useEffect(()=> {
    if(run) {
      setState(p=>({...p, isLoading: true}))
      dispatch(login(form))
      setState(p=>({...p, isLoading: false, run: false}))
    }
  }, [run, dispatch, form])
  
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
              isLoading={isLoading}
              onSubmit={(form)=>setState(p=>({...p, form, run: true}))}
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
