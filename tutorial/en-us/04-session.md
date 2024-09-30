## Session 04: API Services

In this session, we are going to create a file that is very important for communicating between our Frontend application and the Backend. Just a heads-up, we are focusing on the Frontend for now. To simulate an API, we will be using a mock server, which we will explain in more detail later.

## Creating the Employee Service File

Let's get started by creating a file called `employee.service.ts` inside the `src/services` folder. This file is going to help us group all the API operations related to Employee together. It will also help keep our code organized and make future maintenance easier.

Make sure you have a `services` directory inside the `src` folder. If you don’t, create it with the following command:

```bash
mkdir src/services
```

Next, create a file called `employee.service.ts` inside the `services` folder:

```bash
touch src/services/employee.service.ts
```

Freat! Now, let's move on to implementing the `employee.service.ts` file!

## Importing Dependencies and Types

At the top of the `employee.service.ts` file, just import the necessary dependencies and the types we will be using.

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
import axios from 'axios';
import { Employee } from '../types/employee.interface';

const API_BASE_URL = 'http://localhost:3000/employees';
```

</details>
<br/>

Here we are:

- Importing the `axios` package to make HTTP requests.
- Importing the `Employee` interface we created earlier to type our functions.
- Defining the constant `API_BASE_URL` with our API's base URL. In this case, we are using `json-server` running on port `3000`.

## Creating an Axios Instance

Let's now create a configured Axios instance to use in our API calls:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

</details>

This allows us to set default options for all requests, such as the base URL and the `Content-Type` header.

## Implementing Service Methods

Now, let’s implement the service methods for performing CRUD (Create, Read, Update, Delete) operations related to `Employee`.

### `getEmployees` Method

We will start with the `getEmployees` method, responsible for fetching all employees from our API:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await employeeApi.get<Employee[]>('/');
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employees: ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

### `getEmployeeById` Method

To fetch a specific employee, we implement the `getEmployeeById` method:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const response = await employeeApi.get<Employee>(`/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employee: ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

### `createEmployee` Method

To create a new employee, let's implement the `createEmployee` method:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const createEmployee = async (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await employeeApi.post<Employee>('/', {
      ...employee,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to create employee: ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

### `updateEmployee` Method

To update an existing employee, let’s implement the `updateEmployee` method:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const updateEmployee = async (id: string, employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await employeeApi.put<Employee>(`/${id}`, {
      ...employee,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to update employee: ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

### `deleteEmployee` Method

Finally, to delete an employee, we implement the `deleteEmployee` method:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    await employeeApi.delete<void>(`/${id}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to delete employee: ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

## Exporting the Service

Lastly, at the end of the file, we need to export our Axios instance and the service methods:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export default api;
```

</details>
<br/>

Now that we have got the `employee.service.ts` file up and running, we have got a service that covers all the API operations related to `Employee`. This will keep our code nice and organised, plus it will make future maintenance a lot easier.

In the end, the `employee.service.ts` file should look like this:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
import axios from 'axios';
import { Employee } from '../types/employee.interface';

const API_BASE_URL = 'http://localhost:3000/employees';

const employeeApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await employeeApi.get<Employee[]>('/');
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employees: ${err.message}`);
    throw error;
  }
}

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const response = await employeeApi.get<Employee>(`/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employee: ${err.message}`);
    throw error;
  }
}

export const createEmployee = async (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await employeeApi.post<Employee>('/', {
      ...employee,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to create employee: ${err.message}`);
    throw error;
  }
}

export const updateEmployee = async (id: string, employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> => {
  try {
    const response = await employeeApi.put<Employee>(`/${id}`, {
      ...employee,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to update employee: ${err.message}`);
    throw error;
  }
}

export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    await employeeApi.delete<void>(`/${id}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to delete employee: ${err.message}`);
    throw error;
  }
}

export default employeeApi;
```

</details>
<br/>

## Detailed Explanation of Service Methods

Each of our service's methods corresponds to a CRUD operation (Create, Read, Update, Delete) related to the Employee object. Let's take a look at each one in more detail:

- **CREATE**: `createEmployee`
- **READ**: `getEmployees` and `getEmployeeById`
- **UPDATE**: `updateEmployee`
- **DELETE**: `deleteEmployee`

This structure shows the basic operations we can perform on our data. It provides a clear and intuitive API for interacting with the Backend.

Another key thing to note is that we're using `async/await` to make the methods more readable and concise when handling asynchronous operations. Using `async/await` lets us do things like:

- 🔹 Write asynchronous code that looks and behaves like synchronous code.
- 🔹 Improve readability by avoiding "callback hell".
- 🔹 Make error handling easier with `try/catch`.

Since we are using TypeScript, we make sure to type our function parameters and returns so we are passing the right values and handling return values the right way.

The benefits of typing our functions are:

- 🔹 Prevent type errors at compile time.
- 🔹 Improve autocomplete and inline documentation in the IDE.
- 🔹 Make code refactoring and maintenance easier.

In the `createEmployee` and `updateEmployee` methods, we use the utility type called **[Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)**, which allows us to create a new type by omitting some properties from an existing one. In this case, we are excluding the `id`, `createdAt`, and `updatedAt` properties from the `Employee` type.

Why? Because it prevents the Frontend from defining these properties, which should be controlled by the Backend. This also improves data security and integrity, ensuring certain fields can only be set by the Backend.

## Conclusion

In this session, we created the `employee.service.ts` file, which encapsulates all the API operations related to `Employee`. This keeps our code organized and makes future maintenance easier.

By implementing our services in this way, we create a robust and typed layer for interacting with our API. This not only improves the reliability and maintainability of our code but also provides a better development experience, with fewer errors and clearer data operations.

In the next session, we will start creating the Frontend components to interact with these services.

See you in the next session!

**[Previous: Session 03 ⬅️](03-session.md)** | **[Next: Session 05 ➡️](05-session.md)**