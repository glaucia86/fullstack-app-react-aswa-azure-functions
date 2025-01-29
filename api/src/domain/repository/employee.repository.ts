import { Employee, IEmployeeData, IEmployeeWithoutId } from "../entities";

export interface IEmployeeRepository {
  findAll(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | null>;
  findByRegistration(employeeRegistration: number): Promise<Employee | null>;
  create(employeeData: IEmployeeWithoutId): Promise<Employee>;
  update(id: string, employee: Partial<IEmployeeData>): Promise<Employee>;
  delete(id: string): Promise<void>;
}