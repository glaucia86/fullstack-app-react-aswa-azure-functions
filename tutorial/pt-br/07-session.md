# Session 07: Estilização com Tailwind CSS

Nesta sessão, vamos explorar como estilizamos cada componente e página da nossa aplicação usando o **[Tailwind CSS](https://tailwindcss.com/)**. O Tailwind nos permite criar uma interface moderna e responsiva usando classes utilitárias diretamente em nossos elementos.

Vamos começar a deixar a nossa aplicação mais bonita e responsiva?!

## Layout Principal: `App.tsx`

Vamos começar estilizando o layout principal da nossa aplicação.

Abra o arquivo `App.tsx` e vamos adicionar algumas classes do Tailwind CSS para estilizar o layout da nossa aplicação.

<details><summary><b>src/App.tsx</b></summary>

```tsx
// App.tsx
const App: React.FC = () => {
  return (
    <Router>
      {/* Container principal com altura mínima e cor de fundo */}
      <div className='min-h-screen bg-gray-100'>
        {/* Barra de navegação com fundo azul */}
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
        {/* Container de conteúdo centralizado com padding */}
        <div className='container mx-auto p-4'>
          <Routes>
            {/* ... rotas ... */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

```

</details>
<br/>

Aqui, adicionamos algumas classes do Tailwind CSS para estilizar o layout da nossa aplicação:

- `min-h-screen`: define a altura mínima do container principal para ocupar toda a altura da tela. Que nesse caso, é a altura mínima da tela (`100vh`).

- `bg-gray-100`: define a cor de fundo do container principal como cinza claro.

- `bg-blue-600`: define a cor de fundo da barra de navegação como azul.

- `text-white`: define a cor do texto da barra de navegação como branco.

- `p-4`: define o espaçamento interno da barra de navegação como `4`.

- `flex space-x-4`: define o layout da lista de links como flexível e com espaçamento horizontal de `4`.

- `container mx-auto p-4`: define o container de conteúdo centralizado com espaçamento interno de `4`.

Vamos continuar estilizando os componentes da nossa aplicação.

## Formulário de Funcionários: `EmployeeForm`

Abra o arquivo `EmployeeForm.tsx` e vamos adicionar algumas classes do Tailwind CSS para estilizar o formulário de funcionários.

<details><summary><b>src/components/EmployeeForm.tsx</b></summary>

```tsx
//(... código existente ...)

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

Aqui, adicionamos algumas classes do Tailwind CSS para estilizar o formulário de funcionários:

- `max-w-md`: define a largura máxima do formulário como `md` (médio).

- `mb-4`: define o espaçamento inferior de `4` entre os elementos do formulário.

- `block mb-2 font-bold`: define o estilo do rótulo do campo como negrito e com espaçamento inferior de `2`.

- `w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`: define o estilo do campo de entrada com largura total, espaçamento interno de `3` e `2`, borda arredondada, sem contorno e com anel de foco azul.

- `transition-colors duration-300`: define a transição de cores com duração de `300ms`.

Perfeito! Agora, vamos estilizar a lista de funcionários.

## Lista de Funcionários: `EmployeeList`

Abra o arquivo `EmployeeList.tsx` e vamos adicionar algumas classes do Tailwind CSS para estilizar a lista de funcionários.

<details><summary><b>src/components/EmployeeList.tsx</b></summary>

```tsx
//(... código existente ...)

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

Aqui, adicionamos algumas classes do Tailwind CSS para estilizar a lista de funcionários:

- `shadow-lg rounded-lg overflow-hidden`: define a sombra, borda arredondada e ocultação de overflow da tabela.

- `bg-gray-200`: define a cor de fundo do cabeçalho da tabela como cinza claro.

- `hover: bg-gray-50`: define a cor de fundo da linha da tabela como cinza claro ao passar o mouse.

- `space-x-2`: define o espaçamento horizontal de `2` entre os botões de ação.

- `transition-colors duration-300`: define a transição de cores com duração de `300ms`.

Agora, vamos estilizar a página de detalhes do funcionário e a página principal.

## Página de Detalhes do Funcionário: `UpdateEmployee` e `Home`

Abra o arquivo `UpdateEmployee.tsx` e `Home.tsx` e vamos adicionar algumas classes do Tailwind CSS para estilizar as páginas.

<details><summary><b>src/pages/UpdateEmployee.tsx</b></summary>

```tsx
  return (
    <div className='container mx-auto mt-8'>
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

Aqui, adicionamos algumas classes do Tailwind CSS para estilizar as páginas:

- `container mx-auto mt-8`: define o container de conteúdo centralizado com margem superior de `8`.

- `bg-white p-8 shadow-lg rounded-lg max-w-6xl mx-auto`: define o estilo do container de conteúdo com cor de fundo branca, espaçamento interno de `8`, sombra, borda arredondada, largura máxima de `6xl` e centralizado.

- `text-3xl font-bold mb-6 text-gray-800`: define o estilo do título da página como tamanho de texto `3xl`, negrito, margem inferior de `6` e cor de texto cinza.

- `pl-4`: define o espaçamento interno à esquerda de `4`.

Agora, execute a aplicação e veja como ela está mais bonita e responsiva!

```bash
npm run dev-start
```

Acesse a aplicação em `http://localhost:5173` e veja como ela está mais bonita e responsiva!

## Entendendo um pouco mais sobre o Tailwind CSS

O Tailwind CSS é uma ferramenta poderosa para criar interfaces responsivas. Ele fornece classes utilitárias para definir estilos responsivos com base no tamanho da tela.

Por exemplo:

```typescript
<div className='px-4 md:px-6 lg:px-8'> {/* Padding crescente em telas maiores */}
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'> {/* Grid responsivo */}
<table className='hidden md:table'> {/* Visível apenas em telas médias e grandes */}
```

Outro ponto bastante interessante do Tailwind CSS é a questão de temas de cores consistentes. Ele fornece uma paleta de cores padrão que você pode usar em sua aplicação. 

Assim sendo, é muito importante manter uma paleta de cores consistente em toda a aplicação. Isso ajuda a criar uma experiência de usuário mais agradável e profissional. 

Por exemplo:

```typescript
// Cores primárias
'bg-blue-500' // Botões principais
'bg-blue-600' // Estado hover
'text-blue-700' // Links

// Cores de estado
'bg-red-500' // Erro/Deletar
'bg-green-500' // Sucesso
'bg-yellow-500' // Aviso

// Cores neutras
'bg-gray-50' // Fundo suave
'bg-gray-100' // Fundo do site
'text-gray-800' // Texto principal
```

## Dicas de Estilização com Tailwind CSS

Aqui segue algumas dicas de estilização com Tailwind CSS:

- 🔹 **Organização de Classes**
  - 👉 Agrupe classes relacionadas (layout, espaçamento, cores, etc)
  - 👉 Use extract components para estilos repetitivos. 

Por exemplo:

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

Há muito mais a explorar sobre o Tailwind CSS. Para saber mais, consulte a [documentação oficial](https://tailwindcss.com/docs).

## Conclusão

Neste passo, aprendemos a como estilizar a nossa aplicação usando o Tailwind CSS.

A abordagem utility-first nos permitiu criar uma interface moderna e profissional diretamente em nossos componentes, eliminando a necessidade de CSS personalizado.

Nossa aplicação agora apresenta uma estética consistente e profissional, com uma paleta de cores harmoniosa, espaçamentos equilibrados e tipografia clara. A responsividade foi cuidadosamente implementada, garantindo uma experiência fluida em qualquer dispositivo.

O código resultante é não apenas visualmente atraente. Mas, também altamente manutenível e otimizado para performance.

Agora, estamos prontos para avançar para a próxima etapa e adicionar funcionalidades avançadas à nossa aplicação.

Na próxima sessão, faremos a configuração do Mock API para que possamos simular uma API REST e persistir os dados dos funcionários.

Pronto para dar vida aos dados da nossa aplicação? Nos vemos na próxima sessão!

**[Anterior: Sessão 06 ⬅️](06-session.md)** | **[Próximo: Sessão 08 ➡️](08-session.md)**


