import axios from 'axios';
import { Employee } from '../types/employee.interface';

const API_BASE_URL = 'http://localhost:3000/api/employees';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Failed to fetch employees, ${err.message}`);
    throw error;
  }
}

export const getEmployeeById = async (id: number): Promise<Employee> => {
  try {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Failed to fetch employee, ${err.message}`);
    throw error;
  }
}

export const createEmployee = async (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await api.post<Employee>('/employees', {
      ...employee,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Failed to create employee, ${err.message}`, error);
    throw error;
  }
}

export const updateEmployee = async (id: number, employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await api.put<Employee>(`/employees/${id}`, {
      ...employee,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Failed to update employee, ${err.message}`);
    throw error;
  }
}

export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    await api.delete<void>(`/employees/${id}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.log(`Failed to delete employee, ${err.message}`);
    throw error;
  }
}

export default api;