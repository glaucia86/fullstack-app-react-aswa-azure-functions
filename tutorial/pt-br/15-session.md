# Session 15: Implementando DTOs na Camada de Application

Nessa sessão, vamos implementar os Data Transfer Objects (DTOs) na camada de Application. Estes objetos são fundamentais para controlar como os dados fluem entre as diferentes camadas da nossa aplicação.

## Entendendo os DTOs no contexto da nossa aplicação

Os DTOs são objetos simples que carregam dados entre os processos. No nosso contexto eles são responsáveis por definir exatamente quais dados podem entrar e sair da nossa aplicação. Diferente das entidades de domínio, que carregam regras de negócio, os DTOs são estruturas simples focadas apenas em transferência de dados.

Vamos criar a estrutura necessária para nossos DTOs:

```bash
mkdir -p api/src/application/dtos/employee
```

## Implementando o DTO de criação de funcionário

Primeiro, vamos criar o DTO responsável por receber os dados para criar um novo funcionário:

```bash
touch api/src/application/dtos/employee/create-employee.dto.ts
```

Agora, vamos implementar o DTO:

<details><summary><b>src/application/dtos/employee/create-employee.dto.ts</b></summary>

```typescript
export class CreateEmployeeDto {
    public name: string;
    public job_role: string;
    public salary: number;
    public employee_registration: number;

    constructor(params: {
        name: string;
        job_role: string;
        salary: number;
        employee_registration: number;
    }) {
        Object.assign(this, params);
    }
}
```

</details>

Este DTO define exatamente quais dados são necessários para criar um novo funcionário. Observe que não incluíamos campos como `id` e `created_at` ou `updated_at`, pois esses campos são gerenciados automaticamente pelo banco de dados.

## Implementando o DTO de atualização de funcionário

Agora, vamos criar o DTO responsável por receber os dados para atualizar um funcionário existente:

```bash
touch api/src/application/dtos/employee/update-employee.dto.ts
```

Agora, vamos implementar o DTO:

<details><summary><b>src/application/dtos/employee/update-employee.dto.ts</b></summary>

```typescript
export class UpdateEmployeeDto {
  name?: string;
  job_role?: string;
  salary?: number;

  constructor(params: {
    name?: string;
    job_role?: string;
    salary?: number;
  }) {
    Object.assign(this, params);
  }
}
```

</details>

Note que todos os campos são opcionais na atualização. Isso permite que o cliente atualize apenas os campos necessários, sem precisar enviar todos os dados do funcionário.

## Implementando o DTO de resposta de funcionário

Agora, vamos criar o DTO responsável por enviar os dados de um funcionário para o cliente:

```bash
touch api/src/application/dtos/employee/employee-response.dto.ts
```

Agora, vamos implementar o DTO:

<details><summary><b>src/application/dtos/employee/employee-response.dto.ts</b></summary>

```typescript
import Employee from "../../../domain/entities/employee.entity";

export class EmployeeResponseDto {
  private readonly id: string;
  private readonly name: string;
  private readonly job_role: string;
  private readonly salary: number;
  private readonly employee_registration: number;
  private readonly created_at: Date;
  private readonly updated_at: Date;

  private constructor(employee: Employee) {
    this.id = employee.getId();
    this.name = employee.getName();
    this.job_role = employee.getJobRole();
    this.salary = employee.getSalary();
    this.employee_registration = employee.getEmployeeRegistration();
    this.created_at = employee.getCreatedAt();
    this.updated_at = employee.getUpdatedAt();
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      job_role: this.job_role,
      salary: this.salary,
      employee_registration: this.employee_registration,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  public static create(employee: Employee): EmployeeResponseDto {
    return new EmployeeResponseDto(employee);
  }
}
```

</details>

Este DTO inclui todos os campos da entidade de funcionário, mas não expõe diretamente a entidade. Em vez disso, ele expõe apenas os dados necessários para o cliente. Além disso, ele inclui um método `toJSON` para facilitar a conversão do DTO em um objeto JSON. Este método é útil para enviar os dados para o cliente. O método `create` é um construtor estático que facilita a criação de uma nova instância do DTO a partir de uma entidade de funcionário.

## Por que nem todas as operações precisam de DTOs específicos?

Para operações de leitura como: `findById`, `findAll` e deleção como: `delete`, não precisamos de DTOs de entrada específicos porque:

1. Para buscar um funcionário por ID:

```typescript
// Não precisamos de um DTO pois usamos apenas o ID
findById(id: string): Promise<EmployeeResponseDto>;
```

2. Para listar todos os funcionários:

```typescript
// Não precisamos de entrada, apenas retornamos uma lista
findAll(): Promise<EmployeeResponseDto[]>;
```

3. Para deletar um funcionário:

```typescript
// Novamente, apenas o ID é necessário
delete(id: string): Promise<void>
```

Em todos estes casos, usamos apenas tipos primitivos como: `string` para ID ou não precisamos de entrada, apenas retornamos os dados. O `EmployeeResponseDto` é suficiente para padronizar a saída de dados.

Criamos DTOs específicos apenas para: 

- **CreateEmployeeDto**: porque precisamos validar e estruturar vários campos na criação.
- **UpdateEmployeeDto**: porque permitimos atualizações parciais.
- **EmployeeResponseDto**: para padronizar a saída de dados.

Caso no futuro precisarmos adicionar funcionalidades como:

- Filtros complexos na listagem
- Paginação
- Ordenação
- Busca por múltiplos critérios

Aí sim criaríamos novos DTOs específicos, como por exemplo:

```typescript
// Exemplo de um possível DTO futuro para filtros
export class FindEmployeesFilterDto {
  name?: string;
  job_role?: string;
  salary_min?: number;
  salary_max?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
```

## Entendendo a estrutura dos DTOs

Nossa estrututura de DTOs segue um padrão claro onde cada DTO tem um propósito específico:

- `CreateEmployeeDto`: Define os dados necessários para criar um novo funcionário.
- `UpdateEmployeeDto`: Define os dados que podem ser atualizados em um funcionário existente.
- `EmployeeResponseDto`: Define os dados que são retornados para o cliente quando um funcionário é criado ou atualizado.

## Conclusão

Nesta sessão, implementamos os DTOs necessários para nossa aplicação, estabelecendo contratos claros para a entrada e saída de dados. Esta camada de DTOs é crucial pois:

- Estabelece um contrato claro entre o cliente e nossa aplicação.
- Protege nossas entidades de domínio de exposição direta.
- Permite evoluir a API e o domínio de forma independente.
- Facilita a validação e transformação de dados.

Na próxima sessão, implementaremos os serviços da camada de Application, que utilizarão estes DTOs para realizar as operações de negócio.

**[Anterior: Sessão 14 ⬅️](14-session.md)** | **[Próximo: Sessão 16 ➡️](16-session.md)**
