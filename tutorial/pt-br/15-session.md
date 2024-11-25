# Session 15: Implementando DTOs na Camada de Application

Em nossa jornada de desenvolvimento, chegamos num momento muito importante: a implementação da camada de _Application_. É nessa camada que implementamos os _Data Transfer Objects (DTOs)_. 

Esta etapa é fundamental para estabelecer como os dados fluirão entre as diferentes camadas de nossa aplicação, garantindo tanto a integridade quanto a consistência das informações.

## Entendendo os DTOs no contexto da nossa aplicação

No sistema de gerenciamento de funcionários que estamos construindo, os _DTOs_ desempenham um papel específico e vital. Diferentemente das entidades de domínio, que são ricas em regras de negócio, os DTOs são estruturas mais simples, projetadas exclusivamente para transportar dados etnre as camadas da aplicação.

Antes de iniciarmos a implementação propriamente dita, vamos criar a estrutura necessária em nosso projeto. Abra o terminal e execute o seguinte comando para criar o diretório que abrigará os nossos DTOs:

```bash
mkdir -p api/src/application/dtos/employee
```

## A necessidade de três DTOs específicos

Em nossa aplicação, identificamos a necessidade de três DTOs distintos, cada um com um propósito específico. O `CreateEmployeeDTO` será responsável por definir e validar os dados necessários para a criação de um novo funcionário. O `UpdateEmployeeDTO` permitirá atualizações parciais dos dados de funcionários existentes. Por fim, o `EmployeeResponseDTO` padronizará como os dados são retornados pela nossa API.

Vale ressaltar que as operações mais simples, como busca por ID, listagem ou deleção, não necessitam de DTOs específicos. Nestas operações, utilizamos tipos primitivos como string para ID, pois a complexidade adicional de um DTO não traria benefícios significativos.

## Implementação do `CreateEmployeeDTO`

Começaremos implementando o `CreateEmployeeDTO`. Este DTO é particularmente importante pois define o contrato para criação de novos funcionários no sistema. Abra o terminal e crie o arquivo `create-employee.dto.ts` dentro do diretório `api/src/application/dtos/employee`:

```bash
touch api/src/application/dtos/employee/create-employee.dto.ts
```

Agora, adicione o seguinte conteúdo ao arquivo `create-employee.dto.ts`:

<details><summary><b>api/src/application/dtos/employee/create-employee.dto.ts</b></summary>

```typescript
export default class CreateEmployeeDTO {
  public readonly name: string;
  public readonly job_role: string;
  public readonly salary: number;
  public readonly employee_registration: number;

  constructor(params: {
    name: string;
    job_role: string;
    salary: number;
    employee_registration: number;
  }) {
    const { name, job_role, salary, employee_registration } = params;

    if (!name?.trim()) {
      throw new Error('Name is required.');
    }

    if (!job_role?.trim()) {
      throw new Error('Job role is required.');
    }

    if (!salary || salary <= 0) {
      throw new Error('Salary must be greater than zero.');
    }

    if (!employee_registration ||
      employee_registration.toString().length !== 6) {
      throw new Error('Employee registration must be exactly 6 digits.');
    }

    this.name = name;
    this.job_role = job_role;
    this.salary = salary;
    this.employee_registration = employee_registration;
  }

  public toJSON() {
    return {
      name: this.name,
      job_role: this.job_role,
      salary: this.salary,
      employee_registration: this.employee_registration
    };
  }
}
```

</details>
</br>

Observe como estruturamos o _construtor_ para validar imediatamente todos os dados recebidos. Cada campo possui suas próprias regras de validação, garantindo que apenas dados válidos sejam aceitos. O uso de propriedades _readonly_ assegura a imutabilidade do objeto após sua criação.

## Implementação do `UpdateEmployeeDTO`

O `UpdateEmployeeDTO` apresenta uma característica interessante: todos os seus campos são opcionais. Esta decisão de design permite atualizações parciais dos dados, onde o cliente pode modificar apenas os campos necessários. 
Abre o terminal e crie o arquivo `update-employee.dto.ts` dentro do diretório `api/src/application/dtos/employee`:

```bash
touch api/src/application/dtos/employee/update-employee.dto.ts
```

Agora, adicione o seguinte conteúdo ao arquivo `update-employee.dto.ts`:

<details><summary><b>api/src/application/dtos/employee/update-employee.dto.ts</b></summary>

```typescript
export default class UpdateEmployeeDTO {
  public readonly name?: string;
  public readonly job_role?: string;
  public readonly salary?: number;

  constructor(params: {
    name?: string;
    job_role?: string;
    salary?: number;
  }) {
    const { name, job_role, salary } = params;

    if (salary !== undefined && salary <= 0) {
      throw new Error('Salary must be greater than zero.');
    }

    this.name = name;
    this.job_role = job_role;
    this.salary
  }

  public toJSON() {
    return {
      ...((this.name !== undefined) && { name: this.name }),
      ...((this.job_role !== undefined) && { job_role: this.job_role }),
      ...((this.salary !== undefined) && { salary: this.salary }),
    };
  }

  public hasChanges() {
    return this.name !== undefined || this.job_role !== undefined || this.salary !== undefined;
  }
}
```

</details>
</br>

A implementação inclui um método `hasChanges()` particularmente útil, que nos permite verificar se alguma alteração foi efetivamente solicitada. O método `toJSON()` utiliza uma técnica elegante com _[spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)_ para incluir apenas os campos que foram realmente modificados.

## Implementação do `EmployeeResponseDTO`

Por fim, o `EmployeeResponseDTO` define a estrutura exata dos dados que nossa API retornará. Este DTO é importante para manter uma interfae consistente com os clientes de nossa API. 
Abre o terminal e crie o arquivo `employee-response.dto.ts` dentro do diretório `api/src/application/dtos/employee`:

```bash
touch api/src/application/dtos/employee/employee-response.dto.ts
```

Agora, adicione o seguinte conteúdo ao arquivo `employee-response.dto.ts`:

<details><summary><b>api/src/application/dtos/employee/employee-response.dto.ts</b></summary>

```typescript
export class EmployeeResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly job_role: string;
  public readonly salary: number;
  public readonly employee_registration: number;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor(params: {
    id: string;
    name: string;
    job_role: string;
    salary: number;
    employee_registration: number;
    created_at: Date;
    updated_at: Date;
  }) {
    if (!params.id || !params.name || !params.job_role || !params.salary || !params.employee_registration || !params.created_at || !params.updated_at) {
      throw new Error('Invalid parameters');
    }
    this.id = params.id;
    this.name = params.name;
    this.job_role = params.job_role;
    this.salary = params.salary;
    this.employee_registration = params.employee_registration;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      job_role: this.job_role,
      salary: this.salary,
      employee_registration: this.employee_registration,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}
```

</details>
</br>

A validação no construtor garante que todos os campos necessários estejam presentes, enquanto a imutabilidade assegura que os dados permaneçam consistentes durante todo o ciclo de vida do objeto.

## A importância da validação e imutabilidade

Em cada um de nossos DTOs, implementamos validações rigorosas no construtor. Esta abordagem garante que um DTO só possa ser instanciado com dados válidos. Combinado com propriedades _readonly_, isto cria objetos imutáveis que permanecem num estado válido durante toda a sua existência.

A serialização consistente é garantida através do método `toJSON()` em cada DTO, assegurando que os dados sejam sempre apresentados num formato padronizado, independente de onde ou como o DTO é utilizado.

## Conclusão

Nesta sessão, estabelecemos uma base sólida para a transferencia de dados em nossa aplicação. os DTOs que implementamos não são apenas estruturas de dados simples, mas guardiões da integridade dos dados que fluem através de nossa aplicação.

Ao definir claramente o formato dos dados aceitos e retornados, protegemos nossas entidades de domínio e facilitamos a evolução futura da API. As validações implementadas garantem que apenas dados válidos cheguem às camadas mais internas de nossa aplicação.

Na próxima sessão, avançaremos para a implementação dos `Services` da camada de _Application_. Veremos como estes services utilizam os DTOs que acabamos de criar para orquestrar as operações entre a API e o domínio. Exploraremos a criação da interface `IEmployeeService` e sua implementação concreta, descobrindo como todas estas peças se encaixam para formar uma aplicação coesa e bem estruturada.

Até lá! 🚀

**[Anterior: Sessão 14 ⬅️](14-session.md)** | **[Próximo: Sessão 16 ➡️](16-session.md)**