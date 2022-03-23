import { Button } from 'reactstrap';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeGoalAsync } from '../../store/slices/goalSlice';

const Goal = ({ goal }) => {
  const dispatch = useDispatch();
  const date = new Date(goal.createdAt);

  const handleRemove = () => {
    dispatch(removeGoalAsync(goal._id));
  };

  return (
    <div className='goal'>
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
      </div>
    </div>
  );
};

export default Goal;
