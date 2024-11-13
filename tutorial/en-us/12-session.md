# Session 12: Domain Layer - Implementing `Employee` Entity

In this session, we'll implement the main entity of our application, the `Employee`. This part will be essential to our domain as it represents the core of our employee management system.

Let's get started!

## Introduction to Domain Entity

A domain entity is more than just a data structure. It is a representation rich in behaviors and business rules.

In the context of Domain-Driven Design (DDD), entities are objects with unique identities and their own lifecycle. But what defines an Entity?

1. **Unique Identity**
   - Each entity has a unique identifier that distinguishes it from other entities of the same type.
   - Even if two entities have the same attributes, they are distinct if they have different IDs.
   - For example: two employees may have the same name, position, and salary but are different individuals because they have unique IDs.

Example:

```typescript
// Example of two employees with the same attributes but different IDs
const employee1 = new Employee('emp-1', 'John Doe', 'Developer', 5000, '123456')
const employee2 = new Employee('emp-2', 'John Doe', 'Developer', 5000, '1234567')

// They are different employees even with identical data
console.log(employee1.getId() !== employee2.getId()) // true
```

2. **Lifecycle**
   - Entities are objects that have a timeline.
   - They can be created, modified, and eventually deactivated or deleted.
   - They keep track of when they were created and modified.
   - Their changes are tracked and significant to the business.

Example:

```typescript
// Example of an employee's lifecycle
const employee = new Employee("emp-1", "John Doe", "Junior Developer", 5000, 123456);
console.log(employee.getCreatedAt()); // Creation date

// Employee promotion
employee.updateJobRole("Senior Developer");
employee.giveSalaryIncrease(20);
console.log(employee.getUpdatedAt()); // New update date
```

3. **Behaviors and Business Rules**
   - Entities encapsulate not just data but also behaviors.
   - They implement business rules that ensure the entity is always in a valid state.
   - They are responsible for maintaining their own consistency.

Example:

```typescript
// Instead of just storing data
class Employee {
  private salary: number; // ❌ Simplistic approach

  // We encapsulate behaviors and rules
  private salary: Salary; // ✅ Value Object with business rules

  // Methods expressing domain behaviors
  public giveSalaryIncrease(percentage: number): void {
    if (percentage > 30) {
      // Business rule: increase cannot exceed 30%
      throw new Error("Salary increase cannot exceed 30%")
    }
    this.salary = this.salary.increaseByPercentage(percentage);
    this.updateTimestamp();
  }
}
```

4. **Invariants**
   - These are rules that must always be true for the entity.
   - They ensure the entity never ends up in an invalid state.
   - They are checked in all operations that may modify the entity.

Example:

```typescript
class Employee {
  private validateName(name: string): void {
    // Employee name invariants
    if (!name || name.trim().length < 2) {
      throw new Error("Employee name must have at least 2 characters");
    }

    if (name.trim().length > 100) {
      throw new Error("Employee name must have at most 100 characters");
    }
  }

  private updateName(newName: string): void {
    // Ensures invariants are respected before changing
    this.validateName(newName);
    this.name = newName;
    this.updateTimestamp();
  }
}
```

### Why Are Entities Important?

- **Data Integrity:** Business rules are enforced by the entity itself, preventing invalid creation or modification, significantly reducing bugs and unexpected behaviors.
- **Code Expressiveness:** Code directly reflects business rules and processes, making it easier to understand and maintain while serving as a living documentation of the domain.
- **Maintainability:** Changes in business rules are easier to implement as they are in one place, reducing inconsistencies and making testing and evolving the application simpler.

In our employee management application, the `Employee` entity is not just a set of data like name, position, and salary. It is a complete representation of an employee, encompassing all the rules that define how an employee can be created, modified, and which operations are allowed within our business context.

This domain-rich approach helps us create a system that does more than just store data – it genuinely models and enforces the real-world rules and behaviors we are representing.

Now that we understand what a domain entity is and why it’s important, let’s implement our `Employee` entity!

## Creating the `Employee` Entity

First, let's create the file for our entity.

In the directory: `api/src/domain/entities`, create a file named `employee.ts`.

```bash
touch api/src/domain/entities/employee.ts
```

Now, let’s implement our `Employee` entity.

<details><summary><b>api/src/domain/entities/employee.ts</b></summary>

```typescript
import EmployeeRegistration from "../value-objects/employee-registration";
import Salary from "../value-objects/salary";

export default class Employee {
  private readonly id: string;
  private name: string;
  private jobRole: string;
  private salary: Salary;
  private employeeRegistration: EmployeeRegistration;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    jobRole: string,
    salary: number,
    employeeRegistration: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.validateEmployee(name, jobRole);

    this.id = id;
    this.name = name;
    this.jobRole = jobRole;
    this.salary = new Salary(salary);
    this.employeeRegistration = new EmployeeRegistration(employeeRegistration);
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Private validation methods
  private validateEmployee(name: string, jobRole: string): void {
    this.validateName(name);
    this.validateJobRole(jobRole);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error("Employee name must be at least 2 characters long");
    }

    if (name.trim().length > 100) {
      throw new Error("Employee name cannot exceed 100 characters");
    }

    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!nameRegex.test(name.trim())) {
      throw new Error('Employee name contains invalid characters');
    }
  }

  private validateJobRole(jobRole: string): void {
    if (!jobRole || jobRole.trim().length < 2) {
      throw new Error('Job role must be at least 2 characters long');
    }

    if (jobRole.trim().length > 50) {
      throw new Error('Job role cannot exceed 50 characters');
    }

    // Validation for special characters (allows letters, numbers, spaces, and some special characters)
    const jobRoleRegex = /^[a-zA-Z0-9\s-]+$/;
    if (!jobRoleRegex.test(jobRole.trim())) {
      throw new Error('Job role contains invalid characters');
    }
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getJobRole(): string {
    return this.jobRole;
  }

  public getSalary(): number {
    return this.salary.getAmount();
  }

  public getEmployeeRegistration(): number {
    return this.employeeRegistration.getValue();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Business methods
  public updateName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updateTimestamp();
  }

  public updateJobRole(newJobRole: string): void {
    this.validateJobRole(newJobRole);
    this.jobRole = newJobRole;
    this.updateTimestamp();
  }

  public updateSalary(newSalary: number): void {
    this.salary = new Salary(newSalary);
    this.updateTimestamp();
  }

  public giveSalaryIncrease(percentage: number): void {
    this.salary = this.salary.increaseByPercentage(percentage);
    this.updateTimestamp();
  }

  private updateTimestamp(): void {
    this.updatedAt = new Date();
  }

  // Serialization method
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      job_role: this.jobRole,
      salary: this.salary.toJSON(),
      employee_registration: this.employeeRegistration.toJSON(),
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}
```

</details>
</br>

Let’s go over what we did in our `Employee` entity:

1. **Private Properties**

Our `Employee` entity encapsulates its properties as private, adhering to the principle of encapsulation. This ensures that data can only be modified through the class's public methods, maintaining data integrity.

```typescript
private readonly id: string;
private name: string;
private jobRole: string;
private salary: Salary;
private registration: EmployeeRegistration;
private readonly createdAt: Date;
private updatedAt: Date;
```

2. **Rich Constructor**

The entity's constructor isn’t just an initializer – it ensures that an `Employee` can only be created in a valid state.

```typescript
constructor(
  id: string,
  name: string,
  jobRole: string,
  salary: number,
  registration: number,
  createdAt?: Date,
  updatedAt?: Date
) {
  this.validateEmployee(name, jobRole);
  // ...
}
```

3. **Robust Validations**

The entity enforces strict validations to ensure data integrity:

```typescript
private validateName(name: string): void {
  if (!name || name.trim().length < 2) {
    throw new Error('Employee name must be at least 2 characters long');
  }
  // ...
}
```

4. **Domain Behaviors**

The entity is not just a data container – it implements relevant business behaviors:

```typescript
public giveSalaryIncrease(percentage: number): void {
  this.salary = this.salary.increaseByPercentage(percentage);
  this.updateTimestamp();
}
```

## Conclusion

In this session, we implemented the `Employee` entity to be robust and behavior-rich, following Domain-Driven Design principles and object-oriented best practices.

Our entity is not merely a data container – it is a faithful representation of the business rules related to employees in our application.

However, to ensure our entity functions correctly, we need to test it.

In the next session, we’ll write some tests to ensure that our `Employee` entity operates according to the business rules we’ve defined.

**[Previous: Session 11 ⬅️](11-session.md)** | **[Next: Session 13 ➡️](13-session.md)**

