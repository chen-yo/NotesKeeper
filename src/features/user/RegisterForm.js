import { Formik } from 'formik'
import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from './userSlice'

export function RegisterForm() {
    const { error: errors } = useSelector((state) => state.errors)
    // const { loading: isLoading } = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch()

    function handleRegister(form, bag) {
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
                email: '',
                password: '',
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
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div>
                            <Button variant="secondary" type="submit">
                                Register
                                {/* {isLoading ? <Spinner animation="border" variant="secondary" /> : <span>Register</span>} */}
                            </Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}
