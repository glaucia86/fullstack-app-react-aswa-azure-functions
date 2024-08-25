import React from 'react';
import EmployeeList from '../components/EmployeeList';

const ListEmployee: React.FC = () => {
  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Employee List</h1>
      <EmployeeList />
    </div>
  );
};

export default ListEmployee;
