export class CreateEmployeeDto {
    public name: string;
    public job_role: string;
    public salary: number;
    public employee_registration: number;

    constructor(params: {
        name: string;
        job_role: string;
        salary: number;
        employee_registration: number;
    }) {
        Object.assign(this, params);
    }
}
