import * as React from 'react'
import {Form} from 'react-bootstrap'
import {Logo} from './components/logo'
import {useAsync} from './utils/hooks'

function LoginForm({onSubmit, submitButton}) {
  const {isLoading, isError, error, run} = useAsync()
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" />
      </Form.Group>
      <Form.Group>
      <Form.Label htmlFor="username">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>
      <div>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ?<span>Loading</span> : null,
        )}
      </div>
      {isError ?<span>Error occured</span> : null}
    </Form>
  )
}

function UnauthenticatedApp({login, register}) {
  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Notes Keeper</h1>
      <div>
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
  )
}

export {UnauthenticatedApp}
