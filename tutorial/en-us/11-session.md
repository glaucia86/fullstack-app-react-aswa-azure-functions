# Session 11: Domain Layer - Implementing Value Objects

In this session, we will start implementing the domain layer of our application. We will adopt the software architecture pattern known as **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html)** and include concepts from **[SOLID](https://en.wikipedia.org/wiki/SOLID)**.

We’ll guide you step-by-step so you can learn to create an application with a well-defined and organized architecture, aimed at maintainability and scalability in case of future project expansion.

Initially, we will create the _Value Objects_ that will be used in our application.

## Introduction to the Domain Layer

The Domain layer is the heart of our application. It contains:

- 🔹 The main business entities
- 🔹 Fundamental business rules
- 🔹 Interfaces that define how we interact with these entities

In our case, we are creating an employee management system, so our primary entity will be `Employee`.

## Creating the File Structure

Now, let's create the necessary structure for the Domain layer of our application. Open the terminal and run the commands below:

```bash
mkdir -p api/src/domain/entities
mkdir -p api/src/domain/repositories
mkdir -p api/src/domain/exceptions
mkdir -p api/src/domain/value-objects
```

What does each directory represent?

- 📂 `entities`: Contains the main business entities
- 📂 `repositories`: Contains the interfaces defining how we interact with the entities
- 📂 `exceptions`: Contains custom exceptions for our application

Now that we've created and understood what each directory represents, let’s proceed with implementing the Value Objects.

## Implementing _Value Objects_

Before creating our main entity, we’ll implement some _Value Objects_ that will be used in our application.

_Value Objects_ are immutable objects without a unique identity. They encapsulate a value and ensure its validity through logic. In the context of our `Employee`, we’ll create Value Objects for properties that require specific validations. These will be:

- `salary`
- `employee_registration`

Go to the `api/src/domain/value-objects` directory and create a file called `employee-registration.ts` with the following code:

<details><summary><b>api/src/domain/value-objects/employee-registration.ts</b></summary>

```typescript
export default class EmployeeRegistration {
  private readonly registrationNumber: number;

  constructor(registrationNumber: number) {
    this.validateRegistrationNumber(registrationNumber);
    this.registrationNumber = registrationNumber;
  }

  private validateRegistrationNumber(registrationNumber: number): void {
    // Let's validate if the employee registration number is greater than 0 and not a negative number
    if (registrationNumber <= 0) {
      throw new Error('Employee registration must be greater than 0 and not negative');
    }

    // Checks if the employee registration number is an integer
    if (!Number.isInteger(registrationNumber)) {
      throw new Error('Employee registration must be an integer number');
    }

    const registrationNumberString = registrationNumber.toString();
    // Checks if it has between 5 and 6 digits (based on the FrontEnd format)
    if (registrationNumberString.length !== 6) {
      throw new Error('Employee registration must be exactly 6 digits');
    }
  }

  public getValue(): number {
    return this.registrationNumber;
  }

  public isEqualTo(otherRegistration: EmployeeRegistration): boolean {
    return this.registrationNumber === otherRegistration.getValue();
  }

  // Serializes the object to a number
  public toJSON(): number {
    return this.registrationNumber;
  }
}
```

</details>
<br/>

Here we are creating a _Value Object_ called `EmployeeRegistration` with the main objectives:

- 🔹 Ensuring the employee registration number is greater than 0 and not negative
- 🔹 Ensuring the employee registration number has between 5 and 6 digits
- 🔹 Ensuring the employee registration number is an integer

Next, let’s create the _Value Object_ for the `salary` property. Create a file called `salary.ts` in the `api/src/domain/value-objects` directory and add the following code:

<details><summary><b>api/src/domain/value-objects/salary.ts</b></summary>

```typescript
export default class Salary {
  private readonly amount: number;

  constructor(amount: number) {
    this.validateAmount(amount);
    this.amount = amount;
  }

  private validateAmount(amount: number): void {
    // Ensure the salary is not negative
    if (amount < 0) {
      throw new Error('Salary cannot be negative');
    }

    // Ensure the salary is not zero
    if (amount === 0) {
      throw new Error('Salary cannot be zero');
    }

    // Ensure the salary has at most 2 decimal places
    const decimalPlaces = amount.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > 2) {
      throw new Error('Salary must have a maximum of 2 decimal places');
    }
  }

  private validateAdjustment(adjustment: number): void {
    if (adjustment < 0) {
      throw new Error('Adjustment must be greater than zero');
    }

    const decimalPlaces = adjustment.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > 2) {
      throw new Error('Adjustment must have a maximum of 2 decimal places');
    }
  }

  public getAmount(): number {
    return this.amount;
  }

  public addAmount(adjustment: number): Salary {
    this.validateAmount(adjustment);
    return new Salary(this.amount + adjustment);
  }

  public subtractAmount(adjustment: number): Salary {
    this.validateAdjustment(adjustment);
    const newAmount = this.amount - adjustment;

    if (newAmount < 0) {
      throw new Error('Salary cannot be negative');
    }

    return new Salary(newAmount);
  }

  public increaseByPercentage(percentage: number): Salary {
    if (percentage <= 0) {
      throw new Error('Percentage must be greater than zero');
    }

    if (percentage > 100) {
      throw new Error('Percentage cannot be greater than 100');
    }

    const increaseAmount = this.amount * (percentage / 100);
    return new Salary(this.amount + increaseAmount);
  }

  public toJSON(): number {
    return this.amount;
  }

  public isEqualTo(otherSalary: Salary): boolean {
    return this.amount === otherSalary.getAmount();
  }
}
```

</details>
<br/>

Here we are creating a _Value Object_ called `Salary` with the main objectives:

- 🔹 Ensuring the salary is not negative
- 🔹 Ensuring the salary is not zero
- 🔹 Ensuring the salary has at most 2 decimal places
- 🔹 Adding an amount to the salary (for raises or bonuses)
- 🔹 Subtracting an amount from the salary (for deductions)
- 🔹 Increasing the salary by a percentage (for raises)
- 🔹 Checking if the salary is equal to another salary

## Benefits of Value Objects in the Domain Layer

### Encapsulation of Business Rules

Encapsulating rules is a key benefit of _Value Objects_. In enterprise software development, business rules tend to evolve over time.

For instance, today the employee registration number needs to have between 5 and 6 digits, but this format might change in the future.

With _Value Objects_, these rules are centralized in one place. If we need to change how we validate an employee's registration, we only need to modify the `EmployeeRegistration` class, avoiding validation scattered throughout the code. This not only simplifies maintenance but also significantly reduces the risk of bugs when business rules change.

### Power of Immutability

Immutability is a fundamental characteristic of _Value Objects_ that brings safety and predictability to the code.

For example, consider an employee's salary: once we set a value of USD 5,000.00, that specific `Salary` object will always represent that amount. If we need to give a raise, we create a new object.

```typescript
const originalSalary = new Salary(5000);
const increasedSalary = originalSalary.addAmount(1000); // Creates a new object

console.log(originalSalary.getAmount()); // Still 5000
console.log(increasedSalary.getAmount()); // Now 6000
```

This immutability prevents a whole class of bugs related to side effects. There’s no risk of a method inadvertently altering the salary somewhere unexpected, as values are immutable once created.

### Type Safety with TypeScript

Since the primary language of the workshop is TypeScript, it adds an extra layer of safety to our _Value Objects_. Imagine somewhere in the code someone tries to use a salary as a registration number:

```typescript
// ❌ TypeScript prevents this error at compile time
function processEmployeeRegistration(registration: EmployeeRegistration) {
  // ...
}

const salary = new Salary(5000);
processEmployeeRegistration(salary); // Compilation error! Since Salary is not an EmployeeRegistration
```

TypeScript’s system helps catch these errors before the code even runs. This is especially valuable in large codebases where it’s easy to confuse different types of numbers or strings.

### Reusability and Consistency

_Value Objects_ promote code reuse in a way that ensures consistency throughout the application. For example, our `EmployeeRegistration` can be used not only in the `Employee` entity but anywhere that needs to work with employee records.

```typescript
// In an HR service
class HRService {
    validateTransfer(registration: EmployeeRegistration) {
        // Validation

 is already guaranteed by the Value Object
    }
}

// In a financial report
class PayrollReport {
    generateForEmployee(registration: EmployeeRegistration) {
        // Here too, the registration is guaranteed valid
    }
}
```

This reuse not only avoids code duplication but ensures that the same business rules are consistently applied throughout the application. If an employee record is valid in one part of the system, it will be valid in all other parts.

Additionally, when business rules change, modifying a single _Value Object_ automatically propagates the change everywhere it’s used, avoiding the risk of missing updates in different parts of the system.

## Conclusion

In this session, we took an important step in building the backend of our application by implementing _Value Objects_.

We learned how to create immutable objects that encapsulate specific business rules for `salary` and `employee_registration`, ensuring data consistency and integrity across the application.

We saw that _Value Objects_ are more than simple data structures—they are guardians of business rules that:

- 🔹 Centralize data validation
- 🔹 Ensure immutability
- 🔹 Promote code reuse
- 🔹 Utilize TypeScript’s type system for added safety

This solid foundation will allow us to build the rest of the application with greater confidence and maintainability.

In the next session, we will dive into the implementation of the central entity of our application: the `Employee`. See you then! 🚀

**[Previous: Session 10 ⬅️](10-session.md)** | **[Next: Session 12 ➡️](12-session.md)**