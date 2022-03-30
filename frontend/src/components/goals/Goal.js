import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import React, { Fragment, useState } from 'react';
import { FaBullseye, FaCheck, FaPencilAlt, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeGoalAsync } from '../../store/slices/goalSlice';
import { toast } from 'react-toastify';

const registerSchema = Yup.object().shape({
  updatedGoal: Yup.string().min(2, 'Too Short!').required('Please enter goal'),
});

const Goal = ({ goal }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const date = new Date(goal.createdAt);

  const handleRemove = () => {
    dispatch(removeGoalAsync(goal._id));
  };

  return (
    <div className='goal'>
      {!editMode ? (
        <Fragment>
          <div className='goal-detail'>
            <h4>{goal.text}</h4>
            <p className='mb-0'>
              <small>{date.toLocaleDateString('en-US')}</small>
            </p>
          </div>
          <div className='goal-actions'>
            <Button color='danger' onClick={handleRemove}>
              <FaTrashAlt />
            </Button>
            <Button color='info' className='mt-2' onClick={() => setEditMode(true)}>
              <FaPencilAlt />
            </Button>
          </div>
        </Fragment>
      ) : (
        <Formik
          initialValues={{ updatedGoal: goal.text }}
          validationSchema={registerSchema}
          onSubmit={(values, { resetForm }) => {
            const { updatedGoal } = values;
            if (updatedGoal === goal.text) {
              toast.error(`You haven't updated goal!`);
            } else {
              setEditMode(false);
              dispatch();
              resetForm({ updatedGoal: goal.text });
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className='edit-goal-form'>
              <div className='form-group'>
                <InputGroup className={errors.updatedGoal && touched.updatedGoal ? 'is-invalid' : ''}>
                  <InputGroupText>
                    <FaPencilAlt />
                  </InputGroupText>
                  <Input name='updatedGoal' placeholder='Enter Goal' tag={Field} />
                </InputGroup>
                {errors.updatedGoal && touched.updatedGoal && <FormFeedback>{errors.updatedGoal}</FormFeedback>}
              </div>

              <Button type='submit' color='success' className='ms-2'>
                <FaCheck />
              </Button>
              <Button color='danger' className='ms-2' onClick={() => setEditMode(false)}>
                <FaTimes />
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Goal;
