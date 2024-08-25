import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { getEmployeeById, updateEmployee } from '../services/employee.services';
import EmployeeForm from '../components/EmployeeForm';

const UpdateEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        setError('Employee ID is missing');
        setLoading(false);
        return;
      }

      try {
        const data = await getEmployeeById(parseInt(id));
        setEmployee(data);
        setLoading(false);
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Failed to fetch employee: ${err.message}`);
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
      await updateEmployee(parseInt(id), updatedEmployee);
      navigate('/list');
    } catch (error: unknown) {
      const err = error as Error;
      console.error(`Failed to update employee: ${err.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employee) return <div>Employee not found</div>;

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Update Employee</h1>
      <EmployeeForm employee={employee} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateEmployee;
