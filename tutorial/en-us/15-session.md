# Session 15: Implementing DTOs in the Application Layer

In our development journey, we have reached a very important milestone: implementing the _Application_ layer. This is where we implement the _Data Transfer Objects (DTOs)_.

This step is crucial to establish how data will flow between the different layers of our application, ensuring both integrity and consistency of the information.

## Understanding DTOs in the context of our application

In the employee management system we are building, _DTOs_ play a specific and vital role. Unlike domain entities, which are rich in business rules, DTOs are simpler structures designed exclusively to transport data between the application layers.

Before we begin the actual implementation, let's create the necessary structure in our project. Open the terminal and run the following command to create the directory that will house our DTOs:

```bash
mkdir -p api/src/application/dtos/employee
```

## The need for three specific DTOs

In our application, we identified the need for three distinct DTOs, each with a specific purpose. The `CreateEmployeeDTO` will be responsible for defining and validating the data necessary to create a new employee. The `UpdateEmployeeDTO` will allow partial updates to existing employee data. Finally, the `EmployeeResponseDTO` will standardize how data is returned by our API.

It is worth noting that simpler operations, such as retrieving by ID, listing, or deletion, do not require specific DTOs. In these operations, we use primitive types such as a string for IDs because the additional complexity of a DTO would not bring significant benefits.

## Implementing the `CreateEmployeeDTO`

We'll start by implementing the `CreateEmployeeDTO`. This DTO is particularly important because it defines the contract for creating new employees in the system. Open the terminal and create the file `create-employee.dto.ts` inside the `api/src/application/dtos/employee` directory:

```bash
touch api/src/application/dtos/employee/create-employee.dto.ts
```

Now, add the following content to the `create-employee.dto.ts` file:

<details><summary><b>api/src/application/dtos/employee/create-employee.dto.ts</b></summary>

```typescript
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
```

</details>
</br>

Notice how we structured the constructor to immediately validate all received data. Each field has its own validation rules, ensuring that only valid data is accepted. Using _readonly_ properties guarantees the immutability of the object after its creation.

## Implementing the `UpdateEmployeeDTO`

The `UpdateEmployeeDTO` has an interesting characteristic: all its fields are optional. This design decision allows for partial updates to data, where the client can modify only the necessary fields. Open the terminal and create the file `update-employee.dto.ts` inside the `api/src/application/dtos/employee` directory:

```bash
touch api/src/application/dtos/employee/update-employee.dto.ts
```

Now, add the following content to the `update-employee.dto.ts` file:

<details><summary><b>api/src/application/dtos/employee/update-employee.dto.ts</b></summary>

```typescript
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
    this.salary = salary;
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
```

</details>
</br>

The implementation includes a particularly useful `hasChanges()` method, allowing us to verify if any changes were actually requested. The `toJSON()` method uses an elegant technique with the _[spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)_ to include only the fields that have been modified.

## Implementing the `EmployeeResponseDTO`

Finally, the `EmployeeResponseDTO` defines the exact structure of the data that our API will return. This DTO is important for maintaining a consistent interface with the API clients. Open the terminal and create the file `employee-response.dto.ts` inside the `api/src/application/dtos/employee` directory:

```bash
touch api/src/application/dtos/employee/employee-response.dto.ts
```

Now, add the following content to the `employee-response.dto.ts` file:

<details><summary><b>api/src/application/dtos/employee/employee-response.dto.ts</b></summary>

```typescript
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
```

</details>
</br>

The validation in the constructor ensures that all necessary fields are present, while immutability guarantees that the data remains consistent throughout the object's lifecycle.

## The importance of validation and immutability

In each of our DTOs, we implemented rigorous validations in the constructor. This approach ensures that a DTO can only be instantiated with valid data. Combined with _readonly_ properties, this creates immutable objects that remain in a valid state throughout their existence.

Consistent serialization is ensured through the `toJSON()` method in each DTO, making sure that data is always presented in a standardized format, regardless of where or how the DTO is used.

## Conclusion

In this session, we established a solid foundation for data transfer in our application. The DTOs we implemented are not just simple data structures but guardians of the data integrity flowing through our application.

By clearly defining the format of accepted and returned data, we protect our domain entities and facilitate the future evolution of the API. The implemented validations ensure that only valid data reaches the innermost layers of our application.

In the next session, we will advance to implementing the `Services` in the _Application_ layer. We will see how these services use the DTOs we just created to orchestrate operations between the API and the domain. We'll explore the creation of the `IEmployeeService` interface and its concrete implementation, discovering how all these pieces fit together to form a cohesive and well-structured application.

See you then! 🚀

**[Previous: Session 14 ⬅️](14-session.md)** | **[Next: Session 16 ➡️](16-session.md)**
