export class EmployeeResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly job_role: string;
  public readonly salary: number;
  public readonly employee_registration: number;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor(params: {
    id: string;
    name: string;
    job_role: string;
    salary: number;
    employee_registration: number;
    created_at: Date;
    updated_at: Date;
  }) {
    if (!params.id || !params.name || !params.job_role || !params.salary || !params.employee_registration || !params.created_at || !params.updated_at) {
      throw new Error('Invalid parameters');
    }
    this.id = params.id;
    this.name = params.name;
    this.job_role = params.job_role;
    this.salary = params.salary;
    this.employee_registration = params.employee_registration;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      job_role: this.job_role,
      salary: this.salary,
      employee_registration: this.employee_registration,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}