import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { getEmployees, deleteEmployee } from '../services/employee.services';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees(); // Refresh the list after deletion
      } catch (err) {
        setError('Failed to delete employee');
        console.error('Error deleting employee:', err);
      }
    }
  };

  const handleUpdate = (id: number) => {
    navigate(`/update/${id}`);
  };

  if (loading) return <div className='text-center mt-8'>Loading...</div>;
  if (error)
    return <div className='text-center mt-8 text-red-600'>{error}</div>;

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Employee List</h2>
      {employees.length === 0 ? (
        <p className='text-center'>No employees found.</p>
      ) : (
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
                <td className='py-2 px-4 border-b'>
                  ${employee.salary.toFixed(2)}
                </td>
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
      )}
    </div>
  );
};

export default EmployeeList;
