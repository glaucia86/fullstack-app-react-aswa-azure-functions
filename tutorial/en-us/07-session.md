# Session 08: Styling with Tailwind CSS

In this session, we will explore how we style each component and page of our application using **[Tailwind CSS](https://tailwindcss.com/)**. Tailwind allows us to create a modern and responsive interface by applying utility classes directly to our elements.

Let's start making our application more beautiful and responsive!

## Main Layout: `App.tsx`

Let's begin by styling the main layout of our application.

Open the `App.tsx` file and add some Tailwind CSS classes to style the layout of our application.

<details><summary><b>src/App.tsx</b></summary>

```tsx
// App.tsx
const App: React.FC = () => {
  return (
    <Router>
      {/* Main container with minimum height and background color */}
      <div className='min-h-screen bg-gray-100'>
        {/* Navigation bar with blue background */}
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
        {/* Centered content container with padding */}
        <div className='container mx-auto p-4'>
          <Routes>
            {/* ... routes ... */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

```

</details>
<br/>

Here, we added some Tailwind CSS classes to style the layout of our application:

- `min-h-screen`: sets the minimum height of the main container to occupy the entire screen height (`100vh`).

- `bg-gray-100`: sets the background color of the main container to light gray.

- `bg-blue-600`: sets the background color of the navigation bar to blue.

- `text-white`: sets the text color of the navigation bar to white.

- `p-4`: sets the internal padding of the navigation bar to `4`.

- `flex space-x-4`: sets the list of links to a flexible layout with horizontal spacing of `4`.

- `container mx-auto p-4`: sets the content container to be centered with internal padding of `4`.

Let's continue styling the components of our application.

## Employee Form: `EmployeeForm`

Open the `EmployeeForm.tsx` file and add some Tailwind CSS classes to style the employee form.

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
//(... existing code ...)

return (
    <form onSubmit={handleEmployeeSubmit} className='max-w-md'>
      <div className='mb-4'>
        <label htmlFor='name' className='block mb-2 font-bold'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={handleEmployeeFormChange}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='job_role' className='block mb-2 font-bold'>
          Job Role
        </label>
        <input
          type='text'
          id='job_role'
          name='job_role'
          value={job_role}
          onChange={handleEmployeeFormChange}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='salary' className='block mb-2 font-bold'>
          Salary
        </label>
        <NumericFormat
          id='salary'
          name='salary'
          value={salary}
          onValueChange={handleSalaryChange}
          thousandSeparator={true}
          prefix={'$'}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='employee_registration' className='block mb-2 font-bold'>
          Employee Registration
        </label>
        <input
          type='number'
          id='employee_registration'
          name='employee_registration'
          value={employee_registration}
          onChange={handleEmployeeFormChange}
          required
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2'
      >
        {employee ? (
          <>
            <FaEdit />
            <span>Update</span>
          </>
        ) : (
          <>
            <FaPlus />
            <span>Create</span>
          </>
        )}
      </button>
    </form>
  );
```

</details>
<br/>

Here, we added some Tailwind CSS classes to style the employee form:

- `max-w-md`: sets the maximum width of the form to `md` (medium).

- `mb-4`: sets the bottom margin of `4` between form elements.

- `block mb-2 font-bold`: styles the label with bold font and a bottom margin of `2`.

- `w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`: styles the input field with full width, internal padding of `3` and `2`, rounded border, no outline, and a blue focus ring.

- `transition-colors duration-300`: sets the color transition duration to `300ms`.

Perfect! Now, let's style the employee list.

## Employee List: `EmployeeList`

Open the `EmployeeList.tsx` file and add some Tailwind CSS classes to style the employee list.

<details><summary><b>src/components/EmployeeList.tsx</b></summary>

```tsx
//(... existing code ...)

  return (
    <div className='container mx-auto mt-8'>
      <table className='min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='py-2 px-4 border-b text-center'>Name</th>
            <th className='py-2 px-4 border-b text-center'>Job Role</th>
            <th className='py-2 px-4 border-b text-center'>Salary</th>
            <th className='py-2 px-4 border-b text-center'>Registration</th>
            <th className='py-2 px-4 border-b text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className='hover: bg-gray-50'>
              <td className='py-2 px-4 border-b text-center'>
                {employee.name}
              </td>
              <td className='py-2 px-4 border-b text-center'>
                {employee.job_role}
              </td>
              <td className='py-2 px-4 border-b text-center'>
                <NumericFormat
                  value={employee.salary}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </td>
              <td className='py-2 px-4 border-b text-center'>
                {employee.employee_registration}
              </td>
              <td className='py-2 px-4 border-b text-center flex justify-center items-center'>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => handleUpdate(employee.id)}
                    className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 
                          transition-colors duration-300'
                  >
                    <FaEdit className='text-lg' />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className='bg-red-500 text-white p-2 rounded hover:bg-red-600 
                          transition-colors duration-300'
                  >
                    <FaTrash className='text-lg' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
```

</details>
<br/>

Here, we added some Tailwind CSS classes to style the employee list:

- `shadow-lg rounded-lg overflow-hidden`: sets the table shadow, rounded borders, and overflow hiding.

- `bg-gray-200`: sets the header background color to light gray.

- `hover: bg-gray-50`: sets the row background color to light gray when hovered over.

- `space-x-2`: sets horizontal spacing of `2` between action buttons.

- `transition-colors duration-300`: sets the color transition duration to `300ms`.

Now, let's style the employee details page and the main page.

## Employee Details Page: `UpdateEmployee` and `Home`

Open the `UpdateEmployee.tsx` and `Home.tsx` files and add some Tailwind CSS classes to style the pages.

<details><summary><b>src/pages/UpdateEmployee.tsx</b></summary>

```tsx
  return (
    <div class

Name='container mx-auto mt-8'>
      <div className='bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>
          Update Employee
        </h1>
        <div className='pl-4'>
          <EmployeeForm employee={employee} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
```

</details>
<br/>

<details><summary><b>src/pages/Home.tsx</b></summary>

```tsx
return (
    <div className='container mx-auto mt-8'>
      <div className='bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>
          Add New Employee
        </h1>
        <div className='pl-4'>
          <EmployeeForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
```

</details>
<br/>

Here, we added some Tailwind CSS classes to style the pages:

- `container mx-auto mt-8`: sets the content container to be centered with a top margin of `8`.

- `bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto`: styles the content container with a white background, internal padding of `8`, shadow, rounded borders, maximum width of `6xl`, and centered.

- `text-3xl font-bold mb-6 text-gray-800`: styles the page title with a font size of `3xl`, bold font, bottom margin of `6`, and gray text color.

- `pl-4`: sets left padding to `4`.

Now, run the application and see how much more beautiful and responsive it is!

```bash
npm run dev-start
```

Access the application at `http://localhost:5178` and check out how much more beautiful and responsive it is!

## Understanding More About Tailwind CSS

Tailwind CSS is a powerful tool for creating responsive interfaces. It provides utility classes to define responsive styles based on screen size.

For example:

```typescript
<div className='px-4 md:px-6 lg:px-8'> {/* Increasing padding on larger screens */}
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'> {/* Responsive grid */}
<table className='hidden md:table'> {/* Visible only on medium and large screens */}
```

Another interesting point about Tailwind CSS is the concept of consistent color themes. It provides a default color palette that you can use throughout your application.

It’s essential to maintain a consistent color palette across the entire application. This helps to create a more pleasant and professional user experience.

For example:

```typescript
// Primary colors
'bg-blue-500' // Main buttons
'bg-blue-600' // Hover state
'text-blue-700' // Links

// State colors
'bg-red-500' // Error/Delete
'bg-green-500' // Success
'bg-yellow-500' // Warning

// Neutral colors
'bg-gray-50' // Soft background
'bg-gray-100' // Site background
'text-gray-800' // Main text
```

## Styling Tips with Tailwind CSS

Here are some styling tips with Tailwind CSS:

- 🔹 **Class Organization**
  - 👉 Group related classes (layout, spacing, colors, etc.)
  - 👉 Use extracted components for repetitive styles.

For example:

```typescript
const Button = ({ children, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded transition-colors duration-300';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
};
```

There's much more to explore about Tailwind CSS. For more information, check out the [official documentation](https://tailwindcss.com/docs).

## Conclusion

In this step, we learned how to style our application using Tailwind CSS.

The utility-first approach allowed us to create a modern and professional interface directly in our components, eliminating the need for custom CSS.

Our application now has a consistent and professional aesthetic, with a harmonious color palette, balanced spacing, and clear typography. Responsiveness was carefully implemented, ensuring a smooth experience on any device.

The resulting code is not only visually appealing but also highly maintainable and performance-optimized.

Now, we are ready to move on to the next step and add advanced features to our application.

In the next session, we will configure a Mock API to simulate a REST API and persist employee data.

Ready to bring your application's data to life? See you in the next session!

**[Previous: Session 06 ⬅️](06-session.md)** | **[Next: Session 08 ➡️](08-session.md)**
