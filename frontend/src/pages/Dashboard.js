import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Row, Button } from 'reactstrap';
import { FaBullseye } from 'react-icons/fa';
import GoalsContainer from '../components/goals/GoalsContainer';
import { useSelector } from 'react-redux';

const registerSchema = Yup.object().shape({
  goal: Yup.string().min(2, 'Too Short!').required('Please enter goal'),
});

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Row className='justify-content-center mt-5 pt-5'>
      <Col md={7} lg={6} xl={5}>
        <h1 className='text-center mb-4'>Welcome {user.name}</h1>
        <Formik
          initialValues={{ goal: '' }}
          validationSchema={registerSchema}
          onSubmit={(values, { resetForm }) => {
            const { goal } = values;
            console.log(goal);
            resetForm({ goal: '' });
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className={errors.name && touched.name ? 'is-invalid' : ''}>
                  <InputGroupText>
                    <FaBullseye />
                  </InputGroupText>
                  <Input name='goal' placeholder='Enter Goal' tag={Field} />
                </InputGroup>
                {errors.name && touched.name && <FormFeedback>{errors.name}</FormFeedback>}
              </FormGroup>

              <Button type='submit' color='primary' block>
                Add Goal
              </Button>
            </Form>
          )}
        </Formik>
        <GoalsContainer />
      </Col>
    </Row>
  );
};

export default Dashboard;
