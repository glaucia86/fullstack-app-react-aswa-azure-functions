# Session 03: Defining Types

In this session, we'll define the `Employee` interface, which will act as a kind of 'contract' for the employee data structure in our application. This will help us maintain data consistency and take advantage of TypeScript's static typing benefits.

> 👉 **Note**: If you're not familiar with the concept of interfaces, or even with TypeScript, don't worry! We'll be explaining everything to you along the way. However, if you want to learn more about TypeScript, Microsoft offers a completely free course on Microsoft Learn, which you can access [here](https://docs.microsoft.com/learn/paths/build-javascript-applications-typescript/).

## Creating the `Employee` interface file

To keep the code organized, let's create a folder inside the src directory named types:

```bash
mkdir src/types
```

Inside this folder, create a file called: `employee.interface.ts`:

```bash
touch src/types/employee.interface.ts
```

Now, let's define the `Employee` interface with all the necessary fields to represent an employee in our application. Add the following code to the `employee.interface.ts` file:

<details><summary><b>src/types/employee.interface.ts</b></summary>
<br/>

```typescript
export interface Employee {
  id: string;
  name: string;
  job_role: string;
  salary: number;
  employee_registration: number;
  createdAt: Date;
  updatedAt: Date;
}
```

</details>
<br/>

The `Employee` interface has the following fields:

- **id**: Unique identifier for each employee
- **name**: Employee's name.
- **job_role**: The employee's position or role within the company.
- **salary**: The employee's salary. We’ll make a change later to allow it to accept decimal values.
- **employee_registration**: A unique registration number for the employee within the company.
- **createdAt**: The date and time when the employee's record was created.
- **updatedAt**: The date and time of the last update to the employee's record.

## But why use interfaces?

This `Employee` interface will serve as a 'contract' for the objects related to employees throughout our application. By using this interface, we will ensure that:

- 🔹All employee objects have the same structure.
- 🔹TypeScript will alert us if we try to access or assign properties that do not exist in the interface.
- 🔹We get autocomplete and suggestions from the IDE when working with employee objects.

For example:

```typescript
import { Employee } from './types/employee.interface';

// Creates an `employee` object that follows the structure of the `Employee` interface
const employee: Employee = {
  id: '1',
  name: 'John Doe',
  job_role: 'Software Engineer',
  salary: 5000,
  employee_registration: 12345,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// TypeScript will alert us if we try to access or assign properties that don't exist in the interface
const invalidEmployee: Employee = {
  id: '2',
  name: 'Jane Doe',
  job_role: 'Software Engineer',
  // Error: Property 'salary' is missing in type '{ id: string; name: string; job_role: string; }' but required in type 'Employee'
};
```

## Benefits of Defining Types

By defining clear types like the `Employee` interface, we gain several benefits, such as:

1. **Code clarity:** Any developer can quickly understand the structure of an employee's data.
2. **Error prevention:**** TypeScript will alert us to type errors at compile time, preventing many common bugs.
3. **Better autocomplete:** IDEs can provide more accurate suggestions and autocomplete when working with `Employee` objects.
4. **Integrated documentation:** The interface serves as a built-in form of documentation, allowing other developers to quickly understand the data structure.
5. **Safer refactoring:** If you need to change the `Employee` structure, TypeScript will point out all the places that need to be updated.

## Conclusion

In this session, we defined the Employee interface to represent the data structure of employees in our application. This type definition will help us maintain data consistency and make the most of TypeScript's capabilities in our employee management application.

In the next session, we'll create a file that will be crucial for the application. This file will serve as a bridge between the Frontend and the Backend. Stay tuned!

See you in the next session!

**[Previous: Sessão 02 ⬅️](02-session.md)** | **[Next: Sessão 04 ➡️](04-session.md)**
