# Session 15: Implementing DTOs in the Application Layer

In this session, we will implement Data Transfer Objects (DTOs) in the Application layer. These objects are essential for controlling how data flows between the different layers of our application.

## Understanding DTOs in the Context of Our Application

DTOs are simple objects that carry data between processes. In our context, they are responsible for defining exactly what data can enter and exit our application. Unlike domain entities, which contain business rules, DTOs are simple structures focused solely on data transfer.

Let’s create the necessary structure for our DTOs:

```bash
mkdir -p api/src/application/dtos/employee
```

## Implementing the Employee Creation DTO

First, let’s create the DTO responsible for receiving data to create a new employee:

```bash
touch api/src/application/dtos/employee/create-employee.dto.ts
```

Now, let’s implement the DTO:

<details><summary><b>src/application/dtos/employee/create-employee.dto.ts</b></summary>

```typescript
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
```

</details>

This DTO defines exactly what data is required to create a new employee. Note that fields such as `id`, `created_at`, or `updated_at` are excluded since they are managed automatically by the database.

## Implementing the Employee Update DTO

Next, let’s create the DTO responsible for receiving data to update an existing employee:

```bash
touch api/src/application/dtos/employee/update-employee.dto.ts
```

Now, let’s implement the DTO:

<details><summary><b>src/application/dtos/employee/update-employee.dto.ts</b></summary>

```typescript
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
```

</details>

Note that all fields are optional for updates. This allows the client to update only the necessary fields without sending all the employee's data.

## Implementing the Employee Response DTO

Now, let’s create the DTO responsible for sending employee data to the client:

```bash
touch api/src/application/dtos/employee/employee-response.dto.ts
```

Now, let’s implement the DTO:

<details><summary><b>src/application/dtos/employee/employee-response.dto.ts</b></summary>

```typescript
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
```

</details>

This DTO includes all fields of the employee entity but does not expose the entity directly. Instead, it exposes only the necessary data for the client. Additionally, it includes a `toJSON` method to facilitate converting the DTO into a JSON object. This method is useful for sending data to the client. The `create` method is a static constructor that simplifies creating a new DTO instance from an employee entity.

## Why Not All Operations Require Specific DTOs

For read operations like `findById`, `findAll`, and delete operations like `delete`, we do not need specific input DTOs because:

1. To find an employee by ID:

```typescript
// No DTO needed, we use just the ID
findById(id: string): Promise<EmployeeResponseDto>;
```

2. To list all employees:

```typescript
// No input needed, we just return a list
findAll(): Promise<EmployeeResponseDto[]>;
```

3. To delete an employee:

```typescript
// Again, only the ID is needed
delete(id: string): Promise<void>;
```

In all these cases, we use only primitive types like `string` for ID or no input at all. The `EmployeeResponseDto` is sufficient to standardize the data output.

We create specific DTOs only for:

- **CreateEmployeeDto**: To validate and structure multiple fields during creation.
- **UpdateEmployeeDto**: To allow partial updates.
- **EmployeeResponseDto**: To standardize data output.

If we need to add features in the future like:

- Complex filters for listing
- Pagination
- Sorting
- Multi-criteria search

Then we could create new specific DTOs, such as:

```typescript
// Example of a potential future DTO for filters
export class FindEmployeesFilterDto {
  name?: string;
  job_role?: string;
  salary_min?: number;
  salary_max?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
```

## Understanding the Structure of DTOs

Our DTO structure follows a clear pattern where each DTO has a specific purpose:

- `CreateEmployeeDto`: Defines the data required to create a new employee.
- `UpdateEmployeeDto`: Defines the data that can be updated for an existing employee.
- `EmployeeResponseDto`: Defines the data returned to the client when an employee is created or updated.

## Conclusion

In this session, we implemented the necessary DTOs for our application, establishing clear contracts for data input and output. This DTO layer is crucial because:

- It establishes a clear contract between the client and our application.
- It protects our domain entities from direct exposure.
- It allows the API and domain to evolve independently.
- It facilitates data validation and transformation.

In the next session, we will implement the services in the Application layer, which will use these DTOs to perform business operations.

**[Previous: Session 14 ⬅️](14-session.md)** | **[Next: Session 16 ➡️](16-session.md)**
