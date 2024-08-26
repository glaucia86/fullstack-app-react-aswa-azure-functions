import React from 'react';
import Swal from 'sweetalert2';
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
      Swal.fire({
        title: 'Success!',
        text: 'Employee created successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      navigate('/list');
    } catch (error) {
      console.error('Error creating employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <div className='bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Add New Employee</h1>
        <div className='pl-4'>
          <EmployeeForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Home;
