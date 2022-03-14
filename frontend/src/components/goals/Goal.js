import { Button } from 'reactstrap';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Goal = () => {
  return (
    <div className='goal'>
      <div className='goal-detail'>
        <h4>My Goal</h4>
        <p className='mb-0'>
          <small>2/10/2022</small>
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
