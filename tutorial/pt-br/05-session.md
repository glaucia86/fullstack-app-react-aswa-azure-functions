# Session 05: Criando os Componentes React

Nessa sessão, focaremos na criação dos componentes principais da nossa aplicação de gerenciamento de funcionários(as). 

Esse passo será muito importante pois criaremos a interface do usuário e a lógica da nossa aplicação.

Para isso, criaremos dois componentes React que serão os principais da nossa aplicação: 

- `EmployeeForm`: Componente responsável por criar um novo funcionário.

- `EmployeeList`: Componente responsável por listar os funcionários existentes. Sendo também possível: editar e excluir um funcionário.

Ao final, o projeto ficará conforme o gif abaixo:

![Frontend Project](../images/frontend-project.gif)

Então vamos agora criar esses componentes.

## Criando o Componente `EmployeeForm`

O `EmployeeForm` será um componente reutilizável para criar um novo funcionário. Será um formulário simples com os campos: _name_, _job role_, _salary_ e _employee registration_. 

Para isso, vamos seguir os passos abaixo:

1. Crie um novo arquivo dentro de: `src/components/EmployeeForm.tsx`

```bash
touch src/components/EmployeeForm.tsx
```

2. Agora abre o arquivo `EmployeeForm.tsx` e comece adicionando as importações necessárias:

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
import React, { useReducer } from 'react';
import { Employee } from '../types/employee.interface';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { FaPlus, FaEdit } from 'react-icons/fa';
``` 

</details>
<br/>

3. Vamos definir as `props` do componente e o estado inicial:

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

type EmployeeFormState = {
  name: string;
  job_role: string;
  salary: string;
  employee_registration: string;
};

type EmployeeFormAction = {
  [K in keyof EmployeeFormState]: { field: K; value: EmployeeFormState[K] };
}[keyof EmployeeFormState];
```

</details>
<br/>

Depois explicaremos com mais detalhes o que cada parte do código faz. Por enquanto, vamos continuar com a implementação do componente.

4. Implemente o `reducer` para gerenciar o estado do formulário:

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
const employeeFormReducer = (
  state: EmployeeFormState,
  action: EmployeeFormAction
): EmployeeFormState => {
  return {
    ...state,
    [action.field]: action.value,
  };
};
```

</details>
<br/>

5. Agora, estamos prontos para implementar o componente `EmployeeForm`:

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
export default function EmployeeForm({ employee, onSubmit }: EmployeeFormProps) {
  const initialEmployeeValues: EmployeeFormState = {
    name: employee?.name || '',
    job_role: employee?.job_role || '',
    salary: employee?.salary?.toString() || '',
    employee_registration: employee?.employee_registration?.toString() || '',
  };

  const [employeeFormValues, dispatch] = useReducer(
    employeeFormReducer,
    initialEmployeeValues
  );

  const { name, job_role, salary, employee_registration } = employeeFormValues;

  function handleEmployeeFormChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    dispatch({ field: name as keyof EmployeeFormState, value });
  }

  const handleSalaryChange = (values: NumericFormatProps) => {
    const valueString = values.value ? values.value.toString() : '';
    dispatch({ field: 'salary', value: valueString });
  };

  const handleEmployeeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      job_role,
      salary: parseFloat(salary),
      employee_registration: parseInt(employee_registration, 10),
    });
  };

  // Renderização do formulário omitida
}
```

</details>
<br/>

6. Agora, vamos implementar a renderização do formulário:

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
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
          className='w-full px-3 py-2 border rounded'
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
          className='w-full px-3 py-2 border rounded'
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
          className='w-full px-3 py-2 border rounded'
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
          className='w-full px-3 py-2 border rounded'
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

Perfeito! Agora temos o componente `EmployeeForm` pronto.

No final, o arquivo `EmployeeForm.tsx` deve estar assim:

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
import React, { useReducer } from 'react';
import { Employee } from '../types/employee.interface';

import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { FaPlus, FaEdit } from 'react-icons/fa';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (
    employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
}

type EmployeeFormState = {
  name: string;
  job_role: string;
  salary: string;
  employee_registration: string;
};

type EmployeeFormAction = {
  [K in keyof EmployeeFormState]: { field: K; value: EmployeeFormState[K] };
}[keyof EmployeeFormState];

const employeeFormReducer = (
  state: EmployeeFormState,
  action: EmployeeFormAction
): EmployeeFormState => {
  return {
    ...state,
    [action.field]: action.value,
  };
};

export default function EmployeeForm({
  employee,
  onSubmit,
}: EmployeeFormProps) {
  const initialEmployeeValues: EmployeeFormState = {
    name: employee?.name || '',
    job_role: employee?.job_role || '',
    salary: employee?.salary?.toString() || '',
    employee_registration: employee?.employee_registration?.toString() || '',
  };

  const [employeeFormValues, dispatch] = useReducer(
    employeeFormReducer,
    initialEmployeeValues
  );

  const { name, job_role, salary, employee_registration } = employeeFormValues;

  function handleEmployeeFormChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;
    dispatch({ field: name as keyof EmployeeFormState, value });
  }

  const handleSalaryChange = (values: NumericFormatProps) => {
    const valueString = values.value ? values.value.toString() : '';
    dispatch({ field: 'salary', value: valueString });
  };

  const handleEmployeeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      job_role,
      salary: parseFloat(salary),
      employee_registration: parseInt(employee_registration, 10),
    });
  };

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
          className='w-full px-3 py-2 border rounded'
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
          className='w-full px-3 py-2 border rounded'
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
          className='w-full px-3 py-2 border rounded'
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
          className='w-full px-3 py-2 border rounded'
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
}
``` 

</details>
<br/>

Vamos entender algumas partes do código:

- `EmployeeFormProps`: Interface que define as propriedades do componente `EmployeeForm`. Nesse caso, temos a propriedade `employee` que é opcional e a função `onSubmit` que será chamada quando o formulário for submetido.
  
- `EmployeeFormState`: Interface que define o estado do formulário. Aqui, temos os campos `name`, `job_role`, `salary` e `employee_registration`.
  
- `EmployeeFormAction`: Tipo que define as ações possíveis para o formulário. Nesse caso, temos um objeto que mapeia cada campo do formulário para um objeto com a chave `field` e o valor correspondente.
  
- `employeeFormReducer`: Função que recebe o estado atual e uma ação e retorna o novo estado do formulário.
  
- `EmployeeForm`: Componente principal que renderiza o formulário. Aqui, definimos o estado inicial do formulário, o `reducer` para gerenciar o estado, funções para lidar com as mudanças nos campos do formulário e a submissão do formulário.
  
- `handleEmployeeFormChange`: Função que é chamada quando um campo do formulário é alterado. Ela atualiza o estado do formulário com o novo valor do campo.
  
- `handleSalaryChange`: Função que é chamada quando o campo `salary` é alterado. Ela atualiza o estado do formulário com o novo valor do campo formatado como um número.
  
- `handleEmployeeSubmit`: Função que é chamada quando o formulário é submetido. Ela chama a função `onSubmit` passando os valores do formulário como argumento.

Agora que temos o componente `EmployeeForm` pronto, vamos criar o componente `EmployeeList`.

## Criando o Componente `EmployeeList`

O `EmployeeList` será um componente reutilizável para listar os funcionários existentes. Será uma tabela simples com as informações dos funcionários e botões para editar e excluir um funcionário.

Para isso, vamos seguir os passos abaixo:

7. Crie um novo arquivo dentro de: `src/components/EmployeeList.tsx`

```bash
touch src/components/EmployeeList.tsx
```

8. Agora abre o arquivo `EmployeeList.tsx` e comece adicionando as importações necessárias:

<details><summary><b>src/components/EmployeeList.tsx</b></summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { deleteEmployee, getEmployees } from '../services/employee.services';
import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';
import { FaEdit, FaTrash } from 'react-icons/fa';
```

</details>
<br/>

9. Vamos criar o componente `EmployeeList`:

<details><summary><b>src/components/EmployeeList.tsx</b></summary>

```tsx
const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem fetching employees',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this employee?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await deleteEmployee(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Employee has been deleted.',
          icon: 'success',
        });
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem deleting the employee',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/update/${id}`);
  };

  // Renderização da lista de funcionários omitida
};

export default EmployeeList;
```

</details>
<br/>

10. Agora, vamos implementar a renderização da lista de funcionários:

<details><summary><b>src/components/EmployeeList.tsx</b></summary>

```tsx
return (
    <div className='container mx-auto mt-8'>
      <table className='min-w-full bg-white border border-gray-300 shadow-lg'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b text-center'>Name</th>
            <th className='py-2 px-4 border-b text-center'>Job Role</th>
            <th className='py-2 px-4 border-b text-center'>Salary</th>
            <th className='py-2 px-4 border-b text-center'>Registration</th>
            <th className='py-2 px-4 border-b text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
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
                <button
                  onClick={() => handleUpdate(employee.id)}
                  className='bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center'
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center ml-2'
                >
                  <FaTrash />
                </button>
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

Perfeito! Agora temos o componente `EmployeeList` pronto.

No final, o arquivo `EmployeeList.tsx` deve estar assim:

<details><summary><b>src/components/EmployeeList.tsx</b></summary>

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types/employee.interface';
import { deleteEmployee, getEmployees } from '../services/employee.services';

import Swal from 'sweetalert2';
import { NumericFormat } from 'react-number-format';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem fetching employees',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this employee?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await deleteEmployee(id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Employee has been deleted.',
          icon: 'success',
        });
        fetchEmployees();
      } catch (error: unknown) {
        const err = error as Error;
        console.error(`Failed to delete employee: ${err.message}`);
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem deleting the employee',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'Employee deletion has been cancelled',
        icon: 'error',
      });
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className='container mx-auto mt-8'>
      <table className='min-w-full bg-white border border-gray-300 shadow-lg'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b text-center'>Name</th>
            <th className='py-2 px-4 border-b text-center'>Job Role</th>
            <th className='py-2 px-4 border-b text-center'>Salary</th>
            <th className='py-2 px-4 border-b text-center'>Registration</th>
            <th className='py-2 px-4 border-b text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
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
                <button
                  onClick={() => handleUpdate(employee.id)}
                  className='bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center'
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center ml-2'
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
``` 

</details>
<br/>

Vamos entender algumas partes do código:

- `EmployeeList`: Componente principal que renderiza a lista de funcionários. Aqui, definimos o estado inicial da lista de funcionários, a função `fetchEmployees` para buscar os funcionários, as funções `handleDelete` e `handleUpdate` para lidar com a exclusão e edição de um funcionário, respectivamente.
  
- `useEffect`: Hook do React que é chamado quando o componente é montado. Aqui, chamamos a função `fetchEmployees` para buscar os funcionários.
  
- `fetchEmployees`: Função assíncrona que busca os funcionários da API e atualiza o estado da lista de funcionários.
  
- `handleDelete`: Função assíncrona que é chamada quando o botão de exclusão de um funcionário é clicado. Ela exibe um modal de confirmação e, se o usuário confirmar, deleta o funcionário da API e atualiza a lista de funcionários.
  
- `handleUpdate`: Função que é chamada quando o botão de edição de um funcionário é clicado. Ela navega para a página de edição do funcionário.

Observem também que estamos usando os pacotes `sweetalert2` para exibir mensagens de alerta e `react-number-format` para formatar o campo `salary` como um valor monetário.

Agora que temos os componentes `EmployeeForm` e `EmployeeList` prontos, podemos utilizá-los na nossa aplicação.

Estes componentes formam a base da nossa interface de usuário, permitindo a interação com os dados dos funcionários de forma intuitiva e eficiente.

## Conclusão

Ao criar estes componentes React, estabelecemos a estrutura principal da nossa interface de usuário. O `EmployeeForm` nos permite criar um novo funcionário. Enquanto o `EmployeeList` nos permite visualizar, editar e excluir os funcionários existentes. 

Estes componentes utilizam as melhores práticas do React, como **[hooks](https://react.dev/reference/react/hooks)** _(**[useState](https://react.dev/reference/react/useState)**, **[useReducer](https://react.dev/reference/react/useReducer)**, **[useEffect](https://react.dev/reference/react/useEffect)**)_ e gerenciamento eficiente de estado. 

Além disso, integramos bibliotecas úteis como **[SweetAlert2](https://sweetalert2.github.io/)** para melhorar a experiência do usuário e **[react-router-dom](https://www.npmjs.com/package/react-router-dom)** para navegação.

Na próxima sessão, veremos como integrar estes componentes em nossas páginas principais e configurar o roteamento da aplicação.

Nos vemos na próxima sessão!

**[Anterior: Sessão 04 ⬅️](04-session.md)** | **[Próximo: Sessão 06 ➡️](06-session.md)**

