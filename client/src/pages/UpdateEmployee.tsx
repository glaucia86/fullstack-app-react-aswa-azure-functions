import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { getEmployeeById, updateEmployee } from '../services/employee.services';
import { Employee } from '../types/employee.interface';

const UpdateEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getEmployeeById(parseInt(id, 10));
        setEmployee(data);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (
    updatedEmployee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!id) return;
    try {
      await updateEmployee(parseInt(id, 10), updatedEmployee);
      navigate('/list');
    } catch (err) {
      console.error('Error updating employee:', err);
      setError('Failed to update employee');
    }
  };

  if (loading) return <div className='text-center mt-8'>Loading...</div>;
  if (error)
    return <div className='text-center mt-8 text-red-500'>{error}</div>;
  if (!employee)
    return <div className='text-center mt-8'>Employee not found</div>;

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Update Employee</h1>
      <EmployeeForm employee={employee} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateEmployee;
