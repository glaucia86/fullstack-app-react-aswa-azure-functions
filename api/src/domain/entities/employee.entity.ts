export class Employee {
  constructor(
    public readonly id: string,
    public name: string,
    public job_role: string,
    public salary: number,
    public employee_registration: number,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) { }


  public update(data: Partial<Omit<Employee, 'id' | 'createdAt'>>) {
    Object.assign(this, data);
    this.updatedAt = new Date();
  }

  public static create(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Omit<Employee, 'id'> {
    return {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

