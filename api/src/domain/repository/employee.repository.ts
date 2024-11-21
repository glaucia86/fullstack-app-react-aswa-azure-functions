import Employee from "../entities/employee.entity";

export default interface EmployeeRepository {
  create(employee: Employee): Promise<Employee>;
  findById(id: string): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  update(employee: Employee): Promise<Employee>;
  delete(id: string): Promise<void>;

  findByRegistration(registration: number): Promise<Employee | null>;
}