import { logDOM } from "@testing-library/react";
import { Formik } from "formik";
import * as React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "./components/logo";
import { login, register } from "./store/auth-actions"; //add the login part

function LoginForm({ onSubmit, submitButton }) {
  const { error } = useSelector((state) => state.errors);

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

function RegisterForm() {
  const { error: errors } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  function handleRegister(form, bag) {
    console.log(form)

    // bag.setErrors({email: 'Asa dasd as'})
    // bag.setSubmitting(false);
    dispatch(register(form))
    
    // const { email, password } = event.target.elements;
    // onSubmit({
    //   email: email.value,
    //   password: password.value,
    // });
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleRegister}
    >
      {({values, handleSubmit, handleChange, touched})=>{ 
      
      return <Form onSubmit={handleSubmit} noValidate>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={values.email}
              onChange={handleChange}
              isInvalid={touched.email && errors.email}
              id="email" />
              <Form.Control.Feedback type="invalid">
                {errors.email}
                {console.log(errors.email)}
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              id="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={touched.password && errors.password}
            />
          </Form.Group>
          <div>
            <Button variant="secondary" type="submit">Register</Button>
          </div>
          {errors ? <span>{JSON.stringify(errors)}</span> : null}
        </Form>}
       
      }
    </Formik>
  );
}

function UnauthenticatedApp() {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = React.useState(true);

  const handleToggle = () => {
    setShowLogin((p) => !p);
  };

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
          <button type="button" class="btn btn-link" onClick={handleToggle}>
            Register
          </button>
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
          <RegisterForm></RegisterForm>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" class="btn btn-link" onClick={handleToggle}>
            Login
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Notes Keeper</h1>
      <div>{content}</div>
    </div>
  );
}

export { UnauthenticatedApp };
