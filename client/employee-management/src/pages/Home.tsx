import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { createEmployee } from '../services/employee.services';
import EmployeeForm from '../components/EmployeeForm';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      await createEmployee(employee);
      navigate('/list');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Add New Employee</h1>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Home;
