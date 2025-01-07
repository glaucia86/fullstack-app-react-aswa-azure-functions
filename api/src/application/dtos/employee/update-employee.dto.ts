export class UpdateEmployeeDto {
  name?: string;
  job_role?: string;
  salary?: number;

  constructor(params: {
    name?: string;
    job_role?: string;
    salary?: number;
  }) {
    Object.assign(this, params);
  }
}