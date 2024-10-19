# Session 06: Application Pages

In this session, we will be implementing the three main pages of our application:

- `Home.tsx`: the home page with the form to add new employees

- `ListEmployee.tsx`: the employee listing page, which also allows editing and deleting an employee

- `UpdateEmployee.tsx`: the page to edit an employee

Let's get started!

## Creating the `Home.tsx` Page

The Home page will be responsible for displaying the form to add new employees.

To do this, let's follow the steps below:

1. Create a new file at: `src/pages/Home.tsx`:

```bash
mkdir -p src/pages
touch src/pages/Home.tsx
```

2. Now, add the following code to the `Home.tsx` file:

<details><summary><b>src/pages/Home.tsx</b></summary>

```tsx
import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { createEmployee } from '../services/employee.services';
import EmployeeForm from '../components/EmployeeForm';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      await createEmployee(employee);
      Swal.fire({
        title: 'Success!',
        text: 'Employee created successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      navigate('/list');
    } catch (error) {
      console.error('Error creating employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <div className='bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Add New Employee</h1>
        <div className='pl-4'>
          <EmployeeForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Home;
```

</details>
<br/>

Let's understand what's happening in the code above:

- This page uses the `EmployeeForm` component, which is the form we created in the previous session. It is used to add a new employee.

- Then we implemented the `handleSubmit` function, which is responsible for sending the form data to the API.

- The `createEmployee` function is a service responsible for sending the form data to the API and returning the response.

- The API response is an object of type `Employee`, which is the type we created in the previous session.

- We use `react-router-dom` to redirect the user to the employee listing page after creating the employee.

- Finally, `Swal` is a package we use to display success or error messages.

## Creating the `ListEmployee.tsx` Page

The ListEmployee page will display a list of all employees and will also provide options to edit or delete an employee.

Follow the steps below:

3. Create a new file at: `src/pages/ListEmployee.tsx`:

```bash
touch src/pages/ListEmployee.tsx
```

4. Add the following code to the `ListEmployee.tsx` file:

<details><summary><b>src/pages/ListEmployee.tsx</b></summary>

```tsx
import React from 'react';
import EmployeeList from '../components/EmployeeList';

const ListEmployees: React.FC = () => {
  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Employee List</h1>
      <EmployeeList />
    </div>
  );
};

export default ListEmployees;
```

</details>
<br/>

Quite simple, isn't it? But let's understand what's happening in the code above:

- This page is simple and just renders the `EmployeeList` component.

- It provides a title and a container for the employee list.

## Creating the `UpdateEmployee.tsx` Page

The `UpdateEmployee` page will be responsible for displaying the form to edit an existing employee.

To do this, we will follow the steps below:

5. Create a new file at: `src/pages/UpdateEmployee.tsx`:

```bash
touch src/pages/UpdateEmployee.tsx
```

6. Add the following code to the `UpdateEmployee.tsx` file:

<details><summary><b>src/pages/UpdateEmployee.tsx</b></summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { getEmployeeById, updateEmployee } from '../services/employee.services';
import EmployeeForm from '../components/EmployeeForm';
import Swal from 'sweetalert2';

const UpdateEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        setError('Employee ID is missing');
        setLoading(false);
        return;
      }

      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch employee:', error);
        setError('Failed to fetch employee');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (
    updatedEmployee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!id) return;

    try {
      await updateEmployee(id, updatedEmployee);
      Swal.fire({
        title: 'Success!',
        text: 'Employee updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      navigate('/list');
    } catch (error) {
      console.error('Failed to update employee:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem updating employee',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employee) return <div>Employee not found</div>;

  return (
    <div className='container mx-auto mt-8'>
      <div className='bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Update Employee</h1>
        <div className='pl-4'>
          <EmployeeForm employee={employee} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
```

</details>
<br/>

Here we already have a few more details. But let's understand what's happening in the code above:

- In this page, we are using `useParams` from `react-router-dom` to get the `id` of the employee we want to edit.

- It also implements a `useEffect` to fetch the employee by `id` and fill the form with the employee's data.

- The `handleSubmit` function is responsible for sending the form data to the API and updating the employee.

- It uses the `EmployeeForm` component to display and edit the employee's data.

- Displays error or success messages using `Swal`.

Perfect! Now that we have created the pages, we need to integrate these pages with the application's routing.

## Integrating the Pages into the Application

To integrate the pages into our application, we need to set up the routes, usually in the main component of the application, like `App.tsx`.

Let's follow the steps below:

7. Open the file `src/App.tsx` and update it:

<details><summary><b>src/App.tsx</b></summary>

```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ListEmployees from './pages/ListEmployee';
import UpdateEmployee from './pages/UpdateEmployee';

const App: React.FC = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <nav className='bg-blue-600 text-white p-4'>
          <ul className='flex space-x-4'>
            <li>
              <Link to='/' className='hover:underline'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/list' className='hover:underline'>
                Employee List
              </Link>
            </li>
          </ul>
        </nav>
        <div className='container mx-auto p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/list' element={<ListEmployees />} />
            <Route path='/update/:id' element={<UpdateEmployee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
```

</details>
<br/>

Let's understand what's happening in the code above:

- We imported the `Home`, `ListEmployees`, and `UpdateEmployee` pages.

- We used the `Router` component from `react-router-dom` to define the application's routes.

- Each `Route` maps a URL path to a specific component.

- We used the `Link` component to create navigation links between the pages.

- The `Routes` component is responsible for rendering the corresponding component based on the URL path.

- We included basic navigation to allow the user to switch between pages.

Now, if you start the application with `npm run dev-start`, you will be able to navigate between the `Home`, `Employee List`, and `Update Employee` pages.

## Conclusion

In this session, we created the main pages of our employee management application and set up the routing between them. Each page uses the components we created earlier, forming a cohesive and functional application.

The `Home` page allows adding new employees. The `ListEmployee` page displays all employees, and the `UpdateEmployee` page allows editing existing employees. All these pages work together with our API services and reusable components to provide a complete and interactive user experience.

In the next session, we will style our application with Tailwind CSS and add some visual improvements. See you then!

**[Previous: Session 05 ⬅️](05-session.md)** | **[Next: Session 07 ➡️](07-session.md)**
