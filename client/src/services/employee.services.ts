import axios from 'axios';
import { Employee } from '../types/employee.interface';

const API_BASE_URL = 'http://localhost:3000/employees';

const employeeApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await employeeApi.get<Employee[]>('/');
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employees, ${err.message}`);
    throw error;
  }
}

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const response = await employeeApi.get<Employee>(`/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employee, ${err.message}`);
    throw error;
  }
}

export const createEmployee = async (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await employeeApi.post<Employee>('/', {
      ...employee,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to create employee, ${err.message}`, error);
    throw error;
  }
}

export const updateEmployee = async (id: string, employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await employeeApi.put<Employee>(`/${id}`, {
      ...employee,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to update employee, ${err.message}`);
    throw error;
  }
}

export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    await employeeApi.delete<void>(`/${id}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to delete employee, ${err.message}`);
    throw error;
  }
}

export default employeeApi;