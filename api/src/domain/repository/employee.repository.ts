import { Employee } from "../entities";

export interface IEmployeeRepository {
  findAll(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | null>;
  findByRegistration(employeeRegistration: number): Promise<Employee | null>;
  create(employee: Omit<Employee, 'id'>): Promise<Employee>;
  update(id: string, employee: Partial<Omit<Employee, 'id' | 'createdAt' | 'employee_registration'>>): Promise<Employee>;
  delete(id: string): Promise<void>;
}