# Session 04: Serviços de API

Nessa sessão, vamos criar um arquivo que será fundamental para estabelecer a comunicação entre a nossa aplicação no lado do Frontend e o Backend. Lembrando que, nesse primeiro momento estamos focando no desenvolvimento no lado do Frontend. Mas, para simular um funcionamento de uma API usaremos o API mock server, a qual estaremos detalhando mais adiante.

## Criando o arquivo de serviço do funcionário

Agora vamos criar um arquivo chamado `employee.service.ts` dentro da pasta `src/services`. Esse arquivo nos ajudará a encapsular todas as operações de API relacionadas ao `Employee`. Além disso, nos ajudará a manter o código organizado e facilitará a manuntenção futura.

Se certifique de que você tem um diretório chamado `services` dentro do diretório `src`. Caso não tenha, crie-o com o seguinte comando:

```bash
mkdir src/services
```

Dentro da pasta `services`, crie um arquivo chamado `employee.service.ts`:

```bash
touch src/services/employee.service.ts
```

Perfeito! Agora vamos seguir para a implementação do arquivo `employee.service.ts`!

## Importando dependências e tipos

No topo do arquivo `employee.service.ts`, importe as dependências necessárias e os tipos que serão utilizados:

<details><summary><b>src/services/employee.service.ts</b></summary>


```typescript
import axios from 'axios';
import { Employee } from '../types/employee.interface';

const API_BASE_URL = 'http://localhost:3000/employees';
```

</details>
<br/>

Aqui, estamos:

- Importando o pacote `axios` para realizar requisições HTTP.
- Importando a interface `Employee` que criamos anteriormente, visando tipar as nossas funções.
- Definindo a constante `API_BASE_URL` com a URL base da nossa API. Nesse caso, estamos utilizando o `json-server` que roda na porta `3000`.

## Criando uma instância do Axios

Vamos criar agora uma instância configurada do Axios para usar em nossas chamadas de API:

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
<br/>

Isso nos permitirá configurar opções padrões para todas as requisições, como a URL base e o cabeçalho `Content-Type`.

## Implementando os métodos de serviço

Agora, vamos implementar os métodos de serviço para realizar as operações de CRUD (Create, Read, Update, Delete) relacionadas ao `Employee`. 


### Método `getEmployees`

Vamos começar com o método `getEmployees` que será responsável por buscar todos os funcionários da nossa API:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await employeeApi.get<Employee[]>('/');
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employees, ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

### Método `getEmployeeById`

Agora para buscar um funcionário específico, vamos implementar o método `getEmployeeById`:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const response = await employeeApi.get<Employee>(`/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employee, ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

### Método `createEmployee`

Para criar um novo funcionário, vamos implementar o método `createEmployee`:

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
    console.error(`Failed to create employee, ${err.message}`, error);
    throw error;
  }
}
```

</details>
<br/>

### Método `updateEmployee`

Para atualizar um funcionário existente, vamos implementar o método `updateEmployee`:

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
    console.error(`Failed to update employee, ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

### Método `deleteEmployee`

Por fim, para deletar um funcionário, vamos implementar o método `deleteEmployee`:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    await employeeApi.delete<void>(`/${id}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to delete employee, ${err.message}`);
    throw error;
  }
}
```

</details>
<br/>

## Exportando o serviço

Por fim, no final do arquivo precisaremos exportar nossa instância do Axios e os métodos de serviço:

<details><summary><b>src/services/employee.service.ts</b></summary>

```typescript
export default api;
```

</details>
<br/>

Agora que implementamos o arquivo `employee.service.ts`, temos um serviço que encapsula todas as operações de API relacionadas ao `Employee`. Isso nos permitirá manter o código organizado e facilitará a manutenção futura.

No final, o arquivo `employee.service.ts` deve se parecer com isso:

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
    console.error(`Failed to fetch employees, ${err.message}`);
    throw error;
  }
}

export const getEmployeeById = async (id: string): Promise<Employee> => {
  try {
    const response = await employeeApi.get<Employee>(`/${id}`);
    return response.data;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to fetch employee, ${err.message}`);
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
    console.error(`Failed to create employee, ${err.message}`, error);
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
    console.error(`Failed to update employee, ${err.message}`);
    throw error;
  }
}

export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    await employeeApi.delete<void>(`/${id}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Failed to delete employee, ${err.message}`);
    throw error;
  }
}

export default employeeApi;
```

</details>
<br/>

## Explicação detalhada dos métodos de Serviço

Cada método em nosso serviço corresponde uma operação CRUD (Create, Read, Update, Delete) relacionada ao `Employee`. Vamos explicar cada um deles:

- **CREATE**: `createEmployee`
- **READ**: `getEmployees` e `getEmployeeById`
- **UPDATE**: `updateEmployee`
- **DELETE**: `deleteEmployee`

Esta estrutura reflete as operações básicas que podemos realizar em nossos dados proporcionando uma API clara e intuitiva para interagir com o Backend.

Outro ponto a ser observado é que fizemos uso do `async/await`, visando permitir que os métodos lidem com operações assíncronas de forma mais legível e concisa.
O uso de `async/await` nos permite:

- 🔹Escrever código assíncrono que parece e se comporta como código síncrono.
- 🔹Melhorar a legibilidade, evitando "callback hell"
- 🔹Facilitar o tratamento de erros com `try/catch`.

Uma vez que estamos usando TypeScript, tipamos os parâmetros e retornos de nossas funções, com objetivo de garantir que estamos passando os valores corretos e que estamos tratando os valores de retorno de forma adequada.

Os benefícios de tipar nossas funções são:

- 🔹Previne erros de tipo em tempo de compilação.
- 🔹Melhora o autocomplete e a documentação inline no IDE
- 🔹Facilita a refatoração e manutenção do código.
- 🔹Tratamento de Erros com try/catch

Nos métodos `createEmployee` e `updateEmployee`, usamos o utilitário tipo **[Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)**, que nos permite criar um novo tipo excluindo algumas propriedades de um tipo existente. Neste caso, estamos excluindo as propriedades `id`, `createdAt` e `updatedAt` do tipo `Employee`. 

Por que isso? Pois evita que o lado do Frontend defina essas propriedades, que devem ser controladas pelo Backend. Além disso, melhora a segurança e a integridade dos dados, garantindo que certos campos só possam ser definidos pelo Backend.

## Conclusão

Nesta sessão, criamos um arquivo de serviço `employee.service.ts` que encapsula todas as operações de API relacionadas ao `Employee`. Isso nos permitirá manter o código organizizado e facilitará a manutenção futura. 

Ao implementar nossos serviços desta maneira, criamos uma camada robusta e tipada para interagir com a nossa API. Isso não apenas melhora a confiabilidade e manutenção do nosso código, mas também proporciona uma melhor experiência de desenvolvimento, com menos erros e mais clareza nas operações de dados.

Na próxima sessão começaremos a criar os componentes do Frontend para interagir com esses serviços. 

Nos vemos na próxima sessão!

**[Anterior: Sessão 03 ⬅️](03-session.md)** | **[Próximo: Sessão 05 ➡️](05-session.md)**




