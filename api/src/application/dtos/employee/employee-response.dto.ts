import Employee from "../../../domain/entities/employee.entity";

export class EmployeeResponseDto {
  private readonly id: string;
  private readonly name: string;
  private readonly job_role: string;
  private readonly salary: number;
  private readonly employee_registration: number;
  private readonly created_at: Date;
  private readonly updated_at: Date;

  private constructor(employee: Employee) {
    this.id = employee.getId();
    this.name = employee.getName();
    this.job_role = employee.getJobRole();
    this.salary = employee.getSalary();
    this.employee_registration = employee.getEmployeeRegistration();
    this.created_at = employee.getCreatedAt();
    this.updated_at = employee.getUpdatedAt();
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      job_role: this.job_role,
      salary: this.salary,
      employee_registration: this.employee_registration,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  public static create(employee: Employee): EmployeeResponseDto {
    return new EmployeeResponseDto(employee);
  }
}