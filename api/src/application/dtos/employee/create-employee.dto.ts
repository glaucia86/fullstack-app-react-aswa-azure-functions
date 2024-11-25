export default class CreateEmployeeDTO {
  public readonly name: string;
  public readonly job_role: string;
  public readonly salary: number;
  public readonly employee_registration: number;

  constructor(params: {
    name: string;
    job_role: string;
    salary: number;
    employee_registration: number;
  }) {
    const { name, job_role, salary, employee_registration } = params;

    if (!name?.trim()) {
      throw new Error('Name is required.');
    }

    if (!job_role?.trim()) {
      throw new Error('Job role is required.');
    }

    if (!salary || salary <= 0) {
      throw new Error('Salary must be greater than zero.');
    }

    if (!employee_registration ||
      employee_registration.toString().length !== 6) {
      throw new Error('Employee registration must be exactly 6 digits.');
    }

    this.name = name;
    this.job_role = job_role;
    this.salary = salary;
    this.employee_registration = employee_registration;
  }

  public toJSON() {
    return {
      name: this.name,
      job_role: this.job_role,
      salary: this.salary,
      employee_registration: this.employee_registration
    };
  }
}