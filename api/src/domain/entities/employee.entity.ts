import EmployeeRegistration from "../value-objects/employee-registration";
import Salary from "../value-objects/salary";

export default class Employee {
  private readonly id: string;
  private name: string;
  private jobRole: string;
  private salary: Salary;
  private employeeRegistration: EmployeeRegistration;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    jobRole: string,
    salary: number,
    employeeRegistration: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.validateEmployee(name, jobRole);

    this.id = id;
    this.name = name;
    this.jobRole = jobRole;
    this.salary = new Salary(salary);
    this.employeeRegistration = new EmployeeRegistration(employeeRegistration);
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Métodos privados de validação
  private validateEmployee(name: string, jobRole: string): void {
    this.validateName(name);
    this.validateJobRole(jobRole);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error("Employee name must be at least 2 characters long");
    }

    if (name.trim().length > 100) {
      throw new Error("Employee name cannot exceed 100 characters");
    }

    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!nameRegex.test(name.trim())) {
      throw new Error('Employee name contains invalid characters');
    }
  }

  private validateJobRole(jobRole: string): void {
    if (!jobRole || jobRole.trim().length < 2) {
      throw new Error('Job role must be at least 2 characters long');
    }

    if (jobRole.trim().length > 50) {
      throw new Error('Job role cannot exceed 50 characters');
    }

    // Validação para caracteres especiais (permite letras, números, espaços e alguns caracteres especiais)
    const jobRoleRegex = /^[a-zA-Z0-9\s-]+$/;
    if (!jobRoleRegex.test(jobRole.trim())) {
      throw new Error('Job role contains invalid characters');
    }
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getJobRole(): string {
    return this.jobRole;
  }

  public getSalary(): number {
    return this.salary.getAmount();
  }

  public getEmployeeRegistration(): number {
    return this.employeeRegistration.getValue();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Métodos de negócio
  public updateName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updateTimestamp();
  }

  public updateJobRole(newJobRole: string): void {
    this.validateJobRole(newJobRole);
    this.jobRole = newJobRole;
    this.updateTimestamp();
  }

  public updateSalary(newSalary: number): void {
    this.salary = new Salary(newSalary);
    this.updateTimestamp();
  }

  public giveSalaryIncrease(percentage: number): void {
    this.salary = this.salary.increaseByPercentage(percentage);
    this.updateTimestamp();
  }

  private updateTimestamp(): void {
    this.updatedAt = new Date();
  }

  // Método para serialização
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      job_role: this.jobRole,
      salary: this.salary.toJSON(),
      employee_registration: this.employeeRegistration.toJSON(),
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}

