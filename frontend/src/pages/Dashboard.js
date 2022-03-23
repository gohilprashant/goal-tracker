import { Field, Formik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Row, Button } from 'reactstrap';
import { FaBullseye } from 'react-icons/fa';
import GoalsContainer from '../components/goals/GoalsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { addNewGoal, getAllGoals } from '../store/slices/goalSlice';
import { toast } from 'react-toastify';
import { reset } from '../store/slices/uiSlice';

const registerSchema = Yup.object().shape({
  goal: Yup.string().min(2, 'Too Short!').required('Please enter goal'),
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, success } = useSelector((state) => state.ui);
  useEffect(() => {
    if (error) {
      toast(error);
    }
    if (success) {
      toast(success);
    }

    dispatch(reset());
  }, [error, success]);

  useEffect(() => {
    dispatch(getAllGoals());
  }, []);

  return (
    <Row className='justify-content-center mt-5 pt-5'>
      <Col md={7} lg={6} xl={5}>
        <h1 className='text-center mb-4'>Welcome {user.name}</h1>
        <Formik
          initialValues={{ goal: '' }}
          validationSchema={registerSchema}
          onSubmit={(values, { resetForm }) => {
            const { goal } = values;
            dispatch(addNewGoal(goal));
            resetForm({ goal: '' });
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className={errors.goal && touched.goal ? 'is-invalid' : ''}>
                  <InputGroupText>
                    <FaBullseye />
                  </InputGroupText>
                  <Input name='goal' placeholder='Enter Goal' tag={Field} />
                </InputGroup>
                {errors.goal && touched.goal && <FormFeedback>{errors.goal}</FormFeedback>}
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
