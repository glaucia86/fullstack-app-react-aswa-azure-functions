import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Employee } from "../domain";
import { badRequest, created, DependencyContainer, internalServerError } from "../infrastructure";

interface CreateEmployeeRequest {
  name: string;
  job_role: string;
  salary: number;
  employee_registration: number;
}

export async function createEmployee(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const requestData = await request.json();

    if (!isValidEmployeeRequest(requestData)) {
      return badRequest('Invalid employee data. Required fields: name, job_role, salary, employee_registration');
    }

    try {
      const employeeRepository = DependencyContainer.getEmployeeRepository();
      const existingEmployee = await employeeRepository.findByRegistration(requestData.employee_registration);

      if (existingEmployee) {
        return badRequest('Employee with this registration already exists');
      }

      const employeeData = Employee.create({
        name: requestData.name,
        job_role: requestData.job_role,
        salary: requestData.salary,
        employee_registration: requestData.employee_registration
      });

      const newEmployee = await employeeRepository.create(employeeData);

      return created(newEmployee);
    } catch (validationError) {
      return badRequest(validationError.message);
    }
  } catch (error) {
    context.log('Error creating employee: ', error);
    return internalServerError('An error occurred while creating the employee');
  }
};

function isValidEmployeeRequest(data: unknown): data is CreateEmployeeRequest {
  if (!data || typeof data !== 'object') return false;

  const employee = data as Record<string, unknown>;

  return (
    typeof employee.name === 'string' &&
    typeof employee.job_role === 'string' &&
    typeof employee.salary === 'number' &&
    typeof employee.employee_registration === 'number' &&
    employee.name.trim().length > 0 &&
    employee.job_role.trim().length > 0 &&
    !isNaN(employee.salary) &&
    !isNaN(employee.employee_registration)
  )
}

app.http('create-employee', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'employees',
  handler: createEmployee
});
