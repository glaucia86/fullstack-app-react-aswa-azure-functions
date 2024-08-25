import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { deleteEmployee, getEmployees } from '../services/employee.services';

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
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleUpdate = (id: number) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Employee List</h2>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Name</th>
            <th className='py-2 px-4 border-b'>Job Role</th>
            <th className='py-2 px-4 border-b'>Salary</th>
            <th className='py-2 px-4 border-b'>Registration</th>
            <th className='py-2 px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className='py-2 px-4 border-b'>{employee.name}</td>
              <td className='py-2 px-4 border-b'>{employee.job_role}</td>
              <td className='py-2 px-4 border-b'>${employee.salary}</td>
              <td className='py-2 px-4 border-b'>
                {employee.employee_registration}
              </td>
              <td className='py-2 px-4 border-b'>
                <button
                  onClick={() => handleUpdate(employee.id)}
                  className='bg-blue-500 text-white px-2 py-1 rounded mr-2'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded'
                >
                  Delete
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
