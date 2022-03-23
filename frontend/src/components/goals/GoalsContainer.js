import React from 'react';
import { useSelector } from 'react-redux';
import Goal from './Goal';

const GoalsContainer = () => {
  const { goals } = useSelector((state) => state.goal);
  return (
    <div className='goals-container'>
      {goals?.length > 0 ? (
        goals.map((g) => <Goal key={g._id} goal={g} />)
      ) : (
        <p className='text-center mt-3'>You haven't added any goals</p>
      )}
    </div>
  );
};

export default GoalsContainer;
