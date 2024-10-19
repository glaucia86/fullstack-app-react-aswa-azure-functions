# Session 06: Páginas da Aplicação

Nessa sessão, estaremos implementando as 3 páginas da nossa aplicação:

- `Home.tsx`: página inicial com o formulário para adicionar novos funcionários

- `ListEmployee.tsx`: página de listagem de funcionários e que também permite a edição e exclusão de um funcionário

- `UpdateEmployee.tsx`: página de edição de um funcionário

Vamos nessa?

## Criando a página `Home.tsx`

A página Home será responsável por exibir o formulário para adicionar novos funcionários.

Para isso, vamos seguir os passos abaixo:

1. Crie um novo arquivo dentro de: `src/pages/Home.tsx`:

```bash
mkdir -p src/pages
touch src/pages/Home.tsx
```

2. Agora adicione o seguinte código no arquivo `Home.tsx`:

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

Vamos entender o que está acontecendo no código acima:

- Esta página utiliza o componente `EmployeeForm` que é o formulário que criamos na sessão anterior. Ele serve para 
adicionar um novo funcionário.

- Depois implementamos a função `handleSubmit` que é responsável por enviar os dados do formulário para a API.

- A função `createEmployee` é um serviço que é responsável por enviar os dados do formulário para a API e retornar a resposta.

- A resposta da API é um objeto do tipo `Employee`, que é o tipo que criamos na sessão anterior.

- Utilizamos o `react-router-dom` para redirecionar o usuário para a página de listagem de funcionários após a criação do funcionário.

- Por fim, o `Swal` é um pacote que utilizamos para exibir mensagens de sucesso ou erro.

## Criando a página `ListEmployee.tsx`

A página `ListEmployee` será responsável por exibir a lista de funcionários cadastrados e permitir a edição e exclusão de um funcionário.

Para isso, vamos seguir os passos abaixo:

3. Crie um novo arquivo dentro de: `src/pages/ListEmployee.tsx`:

```bash
touch src/pages/ListEmployee.tsx
```

4. Agora adicione o seguinte código no arquivo `ListEmployee.tsx`:

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

Bem simples, não é mesmo? Mas, vamos entender o que está acontecendo no código acima:

- Esta página é simples e apenas renderiza o componente `EmployeeList`.

- Fornece um título e um contêiner para a lista de funcionários.

## Criando a página `UpdateEmployee.tsx`

A página `UpdateEmployee` será responsável por exibir o formulário de edição de um funcionário existente.

Para isso, vamos seguir os passos abaixo:

5. Crie um novo arquivo dentro de: `src/pages/UpdateEmployee.tsx`:

```bash
touch src/pages/UpdateEmployee.tsx
```

6. Agora adicione o seguinte código no arquivo `UpdateEmployee.tsx`:

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

Aqui já temos alguns detalhes a mais. Mas, vamos entender o que está acontecendo no código acima:

- Esta página estamos utilizando o `useParams` do `react-router-dom` para obter o `id` do funcionário que queremos editar.

- Aqui também implementa um `useEffect` para buscar o funcionário pelo `id` e preencher o formulário com os dados do funcionário.

- A função `handleSubmit` é responsável por enviar os dados do formulário para a API e atualizar o funcionário.

- Utiliza o componente `EmployeeForm` para exibir e editar os dados do funcionário.

- Exibe mensagens de erro ou sucesso com o `Swal`.

Perfeito! Agora que temos as páginas criadas, precisamos integrar essas páginas com o roteamento da aplicação. 

## Integrando as páginas na aplicação

Para integrar as páginas em nossa aplicação, precisamos configurar as rotas. geralmente é feito no componente principal da aplicação, como `App.tsx`.

Vamos seguir os passos abaixo:

7. Abra o arquivo `src/App.tsx` e atualize o arquivo:

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

Vamos entender o que está acontecendo no código acima:

- Importamos as páginas `Home`, `ListEmployees` e `UpdateEmployee`.

- Utilizamos o componente `Router` do `react-router-dom` para definir as rotas da aplicação.

- Cada `Route` mapeia um caminho de URL para um componente específico.

- Utilizamos o componente `Link` para criar links de navegação entre as páginas.

- O componente `Routes` é responsável por renderizar o componente correspondente ao caminho da URL.

- Incluímos uma navegação básica para permitir que o usuário alterne entre as páginas.

Agora, se você iniciar a aplicação com `npm run dev-start`, você poderá navegar entre as páginas `Home`, `Employee List` e `Update Employee`.

## Conclusão

Nesta sessão, criamos as principais páginas da nossa aplicação de gerenciamento de funcionários e configuramos o roteamento entre elas. Cada página utiliza os componentes que criamos anteriormente, formando uma aplicação coesa e funcional.

A página `Home` permite a adição de novos funcionários. A página `ListEmployee` exibe todos os funcionários, e a página `UpdateEmployee` permite a edição de funcionários existentes. Todas essas páginas trabalham em conjunto com nossos serviços de API e componentes reutilizáveis para fornecer uma experiência de usuário completa e interativa.

Na próxima sessão, vamos estilizar nossa aplicação com o Tailwind CSS e adicionar algumas melhorias visuais. Até lá! 

**[Anterior: Sessão 05 ⬅️](05-session.md)** | **[Próximo: Sessão 07 ➡️](07-session.md)**