export default class UpdateEmployeeDTO {
  public readonly name?: string;
  public readonly job_role?: string;
  public readonly salary?: number;

  constructor(params: {
    name?: string;
    job_role?: string;
    salary?: number;
  }) {
    const { name, job_role, salary } = params;

    if (salary !== undefined && salary <= 0) {
      throw new Error('Salary must be greater than zero.');
    }

    this.name = name;
    this.job_role = job_role;
    this.salary
  }

  public toJSON() {
    return {
      ...((this.name !== undefined) && { name: this.name }),
      ...((this.job_role !== undefined) && { job_role: this.job_role }),
      ...((this.salary !== undefined) && { salary: this.salary }),
    };
  }

  public hasChanges() {
    return this.name !== undefined || this.job_role !== undefined || this.salary !== undefined;
  }
}