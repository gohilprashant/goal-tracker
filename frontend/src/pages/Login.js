import React from 'react';
import { Button, Card, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaUser, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
});

const Login = () => {
  return (
    <Row className='justify-content-center mt-5 pt-5'>
      <Col md={7} lg={6} xl={5}>
        <div className='custom-card'>
          <div className='text-center mb-4'>
            <h2>Login</h2>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={registerSchema}
            onSubmit={(values, { resetForm }) => {
              const { name, email, password } = values;
              console.log(email, password);
              resetForm({ email: '', password: '' });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup className={errors.email && touched.email ? 'is-invalid' : ''}>
                    <InputGroupText>
                      <FaEnvelope />
                    </InputGroupText>
                    <Input name='email' placeholder='Email' tag={Field} />
                  </InputGroup>
                  {errors.email && touched.email && <FormFeedback>{errors.email}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                  <InputGroup className={errors.password && touched.password ? 'is-invalid' : ''}>
                    <InputGroupText>
                      <FaLock />
                    </InputGroupText>
                    <Input name='password' type='password' placeholder='Password' tag={Field} />
                  </InputGroup>
                  {errors.password && touched.password && <FormFeedback>{errors.password}</FormFeedback>}
                </FormGroup>
                <Button type='submit' color='primary' block>
                  Submit
                </Button>
                <p className='text-center mb-0 mt-2'>
                  <small>
                    Don't have an account? <Link to={'/register'}>Register</Link>
                  </small>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
