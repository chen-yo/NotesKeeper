/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Formik } from "formik";
import * as React from "react";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "./components/logo";
import { login, register } from "./store/auth-actions"; //add the login part

function LoginForm() {
  const { error } = useSelector((state) => state.errors);
  const errors = error?.errorFields || {};
  console.log(errors);
  const { USER_LOGIN } = useSelector((state) => state.pending);
  const pending = USER_LOGIN?.pending;
  const dispatch = useDispatch();

  function handleLogin(form, bag) {
    dispatch(login(form));
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleLogin}
    >
      {({ values, handleSubmit, handleChange, touched }) => {
        return (
          <Form onSubmit={handleSubmit} noValidate>
            {console.log("Login Form", pending)}
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && errors.email}
                // isValid={touched.email && !errors.email}
                id="email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
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
                // isValid={touched.password && !errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
                {console.log(errors.password)}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="invalid-feedback d-block mb-2">
              {errors?.emailOrPasswordIncorrect &&
                "Email or password incorrect"}
            </div>
            <div>
              <Button variant="primary" type="submit" disabled={pending}>
                {pending ? (
                  <Spinner animation="border" variant="secondary" />
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

function RegisterForm() {
  const { error: errors } = useSelector((state) => state.errors);
  // const { loading: isLoading } = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  function handleRegister(form, bag) {
    console.log(form);

    // bag.setErrors({email: 'Asa dasd as'})
    // bag.setSubmitting(false);
    dispatch(register(form));

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
      {({ values, handleSubmit, handleChange, touched }) => {
        return (
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && errors.email}
                isValid={touched.email && !errors.email}
                id="email"
              />
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
                isValid={touched.password && !errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
                {console.log(errors.password)}
              </Form.Control.Feedback>
            </Form.Group>
            <div>
              <Button variant="secondary" type="submit">
                Register
                {/* {isLoading ? <Spinner animation="border" variant="secondary" /> : <span>Register</span>} */}
              </Button>
            </div>
          </Form>
        );
      }}
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
          <LoginForm onSubmit={(form) => dispatch(login(form))}></LoginForm>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-link" onClick={handleToggle}>
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
      <Container css={{display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        <div css={{
          display: 'flex',
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <i class="fas fa-sticky-note"></i>
          <h1 className="ml-2">Notes Keeper</h1>
        </div>
        <div css={{width: '100%'}}>{content}</div>
      </Container>
    </div>
  );
}

export { UnauthenticatedApp };
