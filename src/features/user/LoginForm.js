import { Formik } from "formik";
import * as React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./userSlice";


function useLoading(asyncThunk) {
  const pending = useSelector((state) => state.pending);
  let isLoading = pending[asyncThunk.typePrefix];
  return isLoading
}

export function LoginForm() {
  const { error } = useSelector((state) => state.errors);
  const errors = error?.errorFields || {};
  const isLoading = useLoading(login)
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
              </Form.Control.Feedback>
            </Form.Group>
            <div className="invalid-feedback d-block mb-2">
              {errors?.emailOrPasswordIncorrect &&
                "Email or password incorrect"}
            </div>
            <div>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" color="text-white" />
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
