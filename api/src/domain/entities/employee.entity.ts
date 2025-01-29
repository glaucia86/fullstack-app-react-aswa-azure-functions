export class Employee {
  constructor(
    public readonly id: string,
    public name: string,
    public job_role: string,
    public salary: number,
    public employee_registration: number,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {
    this.validateName(name);
    this.validateSalary(salary);
    this.validateJobRole(job_role);
    this.validateEmployeeRegistration(employee_registration);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Employee name is required');
    }

    if (name.trim().length < 3) {
      throw new Error('Employee name must be at least 3 characters long');
    }

    if (name.trim().length > 100) {
      throw new Error('Employee name cannot exceed 100 characters');
    }
  }

  private validateSalary(salary: number): void {
    if (salary === undefined || salary === null) {
      throw new Error('Employee salary is required');
    }

    if (salary < 0) {
      throw new Error('Salary cannot be negative');
    }
  }

  private validateJobRole(jobRole: string): void {
    if (!jobRole || jobRole.trim().length === 0) {
      throw new Error('Employee job role is required');
    }

    if (jobRole.trim().length < 3) {
      throw new Error('Employee job role must be at least 3 characters long');
    }

    if (jobRole.trim().length > 50) {
      throw new Error('Employee job role cannot exceed 50 characters');
    }
  }

  private validateEmployeeRegistration(registration: number): void {
    if (!registration) {
      throw new Error('Employee registration is required');
    }

    if (registration.toString().length !== 6) {
      throw new Error('Employee registration must have 6 digits');
    }
  }

  public update(data: Partial<Omit<Employee, 'id' | 'createdAt'>>) {

    if (data.name !== undefined) {
      this.validateName(data.name);
    }

    if (data.salary !== undefined) {
      this.validateSalary(data.salary);
    }

    if (data.job_role !== undefined) {
      this.validateJobRole(data.job_role);
    }

    Object.assign(this, data);
    this.updatedAt = new Date();
  }

  public static create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Omit<Employee, 'id'> {

    const employee = new Employee(
      'temp-id',
      data.name,
      data.job_role,
      data.salary,
      data.employee_registration,
      new Date(),
      new Date()
    );

    return {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

