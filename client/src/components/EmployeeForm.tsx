import React, { useReducer } from 'react';
import { Employee } from '../types/employee.interface';

import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { FaPlus, FaEdit } from 'react-icons/fa';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (
    employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
}

type EmployeeFormState = {
  name: string;
  job_role: string;
  salary: string;
  employee_registration: string;
};

type EmployeeFormAction = {
  [K in keyof EmployeeFormState]: { field: K; value: EmployeeFormState[K] };
}[keyof EmployeeFormState];

const employeeFormReducer = (
  state: EmployeeFormState,
  action: EmployeeFormAction
): EmployeeFormState => {
  return {
    ...state,
    [action.field]: action.value,
  };
};

export default function EmployeeForm({
  employee,
  onSubmit,
}: EmployeeFormProps) {
  const initialEmployeeValues: EmployeeFormState = {
    name: employee?.name || '',
    job_role: employee?.job_role || '',
    salary: employee?.salary?.toString() || '',
    employee_registration: employee?.employee_registration?.toString() || '',
  };

  const [employeeFormValues, dispatch] = useReducer(
    employeeFormReducer,
    initialEmployeeValues
  );

  const { name, job_role, salary, employee_registration } = employeeFormValues;

  function handleEmployeeFormChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    dispatch({ field: name as keyof EmployeeFormState, value });
  }

  const handleSalaryChange = (values: NumericFormatProps) => {
    const valueString = values.value ? values.value.toString() : '';
    dispatch({ field: 'salary', value: valueString });
  };

  const handleEmployeeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      job_role,
      salary: parseFloat(salary),
      employee_registration: parseInt(employee_registration, 10),
    });
  };

  return (
    <form onSubmit={handleEmployeeSubmit} className='max-w-md'>
      <div className='mb-4'>
        <label htmlFor='name' className='block mb-2 font-bold'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={handleEmployeeFormChange}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='job_role' className='block mb-2 font-bold'>
          Job Role
        </label>
        <input
          type='text'
          id='job_role'
          name='job_role'
          value={job_role}
          onChange={handleEmployeeFormChange}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='salary' className='block mb-2 font-bold'>
          Salary
        </label>
        <NumericFormat
          id='salary'
          name='salary'
          value={salary}
          onValueChange={handleSalaryChange}
          thousandSeparator={true}
          prefix={'$'}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='employee_registration' className='block mb-2 font-bold'>
          Employee Registration
        </label>
        <input
          type='number'
          id='employee_registration'
          name='employee_registration'
          value={employee_registration}
          onChange={handleEmployeeFormChange}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
                 flex items-center space-x-2 transition-colors duration-300'
      >
        {employee ? (
          <>
            <FaEdit />
            <span>Update</span>
          </>
        ) : (
          <>
            <FaPlus />
            <span>Create</span>
          </>
        )}
      </button>
    </form>
  );
}
