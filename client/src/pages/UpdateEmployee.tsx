import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { getEmployeeById, updateEmployee } from '../services/employee.services';
import EmployeeForm from '../components/EmployeeForm';
import Swal from 'sweetalert2';

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
        const data = await getEmployeeById(id);
        console.log('Employee data: ', data);
        setEmployee(data);
        setLoading(false);
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Failed to fetch employee: ${err.message}`);
        setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem fetching employee',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (
    updatedEmployee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to update this employee?',
      text: 'Do you want to save these changes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      if (!id) return;

      try {
        await updateEmployee(id, updatedEmployee);
        Swal.fire({
          title: 'Success!',
          text: 'Employee updated successfully!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        navigate('/list');
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Failed to update employee: ${err.message}`);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem updating employee',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Employee update has been cancelled',
        icon: 'error',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employee) return <div>Employee not found</div>;

  return (
    <div className='container mx-auto mt-8'>
      <div className='bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Update Employee</h1>
        <div className='pl-4'>
          <EmployeeForm employee={employee} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
