import { Button } from 'reactstrap';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Goal = ({ goal }) => {
  const date = new Date(goal.createdAt);

  return (
    <div className='goal'>
      <div className='goal-detail'>
        <h4>{goal.text}</h4>
        <p className='mb-0'>
          <small>{date.toLocaleDateString('en-US')}</small>
        </p>
      </div>
      <div className='goal-actions'>
        <Button color='danger'>
          <FaTrashAlt />
        </Button>
      </div>
    </div>
  );
};

export default Goal;
