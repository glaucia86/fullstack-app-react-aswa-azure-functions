import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { deleteEmployee, getEmployees } from '../services/employee.services';

import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem fetching employees',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this employee?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await deleteEmployee(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Employee has been deleted.',
          icon: 'success',
        });
        fetchEmployees();
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Failed to delete employee: ${err.message}`);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem deleting the employee',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Employee deletion has been cancelled',
        icon: 'error',
      });
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className='container mx-auto mt-8'>
      <table className='min-w-full bg-white border border-gray-300 shadow-lg'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b text-center'>Name</th>
            <th className='py-2 px-4 border-b text-center'>Job Role</th>
            <th className='py-2 px-4 border-b text-center'>Salary</th>
            <th className='py-2 px-4 border-b text-center'>Registration</th>
            <th className='py-2 px-4 border-b text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className='py-2 px-4 border-b text-center'>
                {employee.name}
              </td>
              <td className='py-2 px-4 border-b text-center'>
                {employee.job_role}
              </td>
              <td className='py-2 px-4 border-b text-center'>
                <NumericFormat
                  value={employee.salary}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </td>
              <td className='py-2 px-4 border-b text-center'>
                {employee.employee_registration}
              </td>
              <td className='py-2 px-4 border-b text-center flex justify-center items-center'>
                <button
                  onClick={() => handleUpdate(employee.id)}
                  className='bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center'
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center ml-2'
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
