# Session 12: Camada de Domínio - Implementando Entidade `Employee`

Nessa sessão, vamos implementar a entidade principal da nossa aplicação, o `Employee`. Essa parte será muito importante do nosso domínio, pois representa o núcleo do nosso sistema de gerenciamento de funcionários.

Vamos nessa?!

## Introdução sobre Entidade de Domínio

Uma entidade de domínio é mais do que uma simples estrutura de dados. Ela é uma representação rica em comportamentos e regras de negócio.

No contexto do Domain-Driven Design (DDD), entidades são objetos que tem um identidade única e ciclo de vida próprio. Mas o que define uma Entidade?

1. **Identidade Única**
   - Cada entidade possui um identificador único que a distingue de todas as outras entidades do mesmo tipo.
   - Mesmo que duas entidades tenham exatamente os mesmos atributos, se tiverem IDs diferentes, são consideradas entidades distintas.
   - Por exemplo: dois funcionários podem ter o mesmo nome, mesmo cargo e mesmo salário, mas são pessoas diferentes por terem IDs únicos.

Exemplo:

```typescript
// Exemplo de dois funcionários com os mesmos atributos, mas com IDs diferentes
const employee1 = new Employee('emp-1', 'John Doe', 'Developer', 5000, '123456')
const employee2 = new Employee('emp-2', 'John Doe', 'Developer', 5000, '1234567')

// São funcionários diferentes mesmo com dados iguais
console.log(employee1.getId() !== employee2.getId()) // true
```

2. **Ciclo de Vida**
   - Entidades são objetos que têm uma linha do tempo
   - Podem ser criadas, modificadas e, eventualmente, desativadas ou excluídas.
   - Mantêm registro de quando foram criadas e modificadas.
   - Suas mudanças são rastreadas e significativas para o negócio.

Exemplo:

```typescript
// Exemplo de ciclo de vida de um funcionário
const employee = new Employee("emp-1", "John Doe", "Junior Developer", 5000, 123456);
console.log(employee.getCreatedAt()); // Data de criação

// Promoção do funcionário
employee.updateJobRole("Senior Developer");
employee.giveSalaryIncrease(20);
console.log(employee.getUpdatedAt()); // Nova data de atualização
```

3. **Comportamentos e Regras de Negócio**
   - Entidades encapsulam não apenas dados. Mas, também comportamentos.
   - Implementam regras de negócio que garantem que a entidade sempre esteja em um estado válido.
   - São responsáveis por manter sua própria consistência.

Exemplo:

```typescript
// Ao invés de apenas armazenar dados
class Employee {
  private salary: number; // ❌ Abordagem simplista

  // Encapsulamos comportamentos e regras
  private salary: Salary; // ✅ Value Object com regras de negócio

  // Métodos que expressam comportamentos do domínio
  public giveSalaryIncrease(percentage: number): void {
    if (percentage > 30) {
      // Regra de negócio: aumento não pode ser maior que 30%
      throw new Error("Salary increase cannot exceed 30%")
    }
    this.salary = this.salary.increaseByPercentage(percentage);
    this.updateTimestamp();
  }
}
```

4. **Invariantes**
  - São regras que devem ser sempre verdadeiras para a entidade.
  - Garantem que a entidade nunca fique em um estado inválido.
  - São verificadas em todas as operações que podem modificar a entidade.

Exemplo:

```typescript	
class Employee {
  private validateName(name: string): void {
    // Invariantes do nome do funcionário
    if (!name || name.trim().length < 2) {
      throw new Error("Employee name must have at least 2 characters");
    }

    if (name.trim().length > 100) {
      throw new Error("Employee name must have at most 100 characters");
    }
  }

  private updateName(newName: string): void {
    // Garante que invariantes são respeitadas antes da mudança
    this.validateName(newName);
    this.name = newName;
    this.updateTimestamp();
  }
}
```

### Por que Entidades são Importantes?

- **Integridade dos dados:** as regras de negócio são garantidas pela própria entidade. Além disso, impossibilita criar ou modificar uma entidade de forma inválida. E, principalmente reduz bugs e comportamentos inesperados.
- **Expressividade do Código:** o código acaba refletindo diretamente as regras e processos do negócio. Também facilita o entendimento e manutenção do código. E, por fim, serve como documentação viva do domínio.
- **Manutenibilidade:** mudanças nas regras de negócio ficam mais facéis de serem implementadas, por estarem em um único lugar. Assim, evita inconsistênecias e fica mais fácil de testar e evoluir a aplicação.

Em nossa aplicação de gerenciamento de funcionários, a enteidade `Employee` não é apenas um conjunto de dados como nome, cargo e salário. Ela é uma representação completa de um funcionário, com todas as regras que definem como um funcionário pode ser criado, modificado e quais operações são permitidas ou não no contexto do nosso negócio.

Esta abordagem rica em domínio nos ajuda a criar um sistema que não penas armazena dados, mas verdadeiramente modela e implementa as regras e comportamentos do mundo real que estamos representando.

Agora que já entendemos o que é uma entidade de domínio e por que ela é importante, vamos implementar a nossa entidade `Employee`!

## Criando a Entidade `Employee`

Primeiro, vamos criar o arquivo para a nossa entidade.

No diretório: `api/src/domain/entities`, crie um arquivo chamado `employee.ts`.

```bash
touch api/src/domain/entities/employee.ts
```

Agora, vamos implementar a nossa entidade `Employee`.

<details><summary><b>api/src/domain/entities/employee.ts</b></summary>

```typescript
import EmployeeRegistration from "../value-objects/employee-registration";
import Salary from "../value-objects/salary";

export default class Employee {
  private readonly id: string;
  private name: string;
  private jobRole: string;
  private salary: Salary;
  private employeeRegistration: EmployeeRegistration;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    jobRole: string,
    salary: number,
    employeeRegistration: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.validateEmployee(name, jobRole);

    this.id = id;
    this.name = name;
    this.jobRole = jobRole;
    this.salary = new Salary(salary);
    this.employeeRegistration = new EmployeeRegistration(employeeRegistration);
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Métodos privados de validação
  private validateEmployee(name: string, jobRole: string): void {
    this.validateName(name);
    this.validateJobRole(jobRole);
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error("Employee name must be at least 2 characters long");
    }

    if (name.trim().length > 100) {
      throw new Error("Employee name cannot exceed 100 characters");
    }

    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!nameRegex.test(name.trim())) {
      throw new Error('Employee name contains invalid characters');
    }
  }

  private validateJobRole(jobRole: string): void {
    if (!jobRole || jobRole.trim().length < 2) {
      throw new Error('Job role must be at least 2 characters long');
    }

    if (jobRole.trim().length > 50) {
      throw new Error('Job role cannot exceed 50 characters');
    }

    // Validação para caracteres especiais (permite letras, números, espaços e alguns caracteres especiais)
    const jobRoleRegex = /^[a-zA-Z0-9\s-]+$/;
    if (!jobRoleRegex.test(jobRole.trim())) {
      throw new Error('Job role contains invalid characters');
    }
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getJobRole(): string {
    return this.jobRole;
  }

  public getSalary(): number {
    return this.salary.getAmount();
  }

  public getEmployeeRegistration(): number {
    return this.employeeRegistration.getValue();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // Métodos de negócio
  public updateName(newName: string): void {
    this.validateName(newName);
    this.name = newName;
    this.updateTimestamp();
  }

  public updateJobRole(newJobRole: string): void {
    this.validateJobRole(newJobRole);
    this.jobRole = newJobRole;
    this.updateTimestamp();
  }

  public updateSalary(newSalary: number): void {
    this.salary = new Salary(newSalary);
    this.updateTimestamp();
  }

  public giveSalaryIncrease(percentage: number): void {
    this.salary = this.salary.increaseByPercentage(percentage);
    this.updateTimestamp();
  }

  private updateTimestamp(): void {
    this.updatedAt = new Date();
  }

  // Método para serialização
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      job_role: this.jobRole,
      salary: this.salary.toJSON(),
      employee_registration: this.employeeRegistration.toJSON(),
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}
```

</details>
</br>

Vamos entender o que fizemos na nossa entidade `Employee`:

1. **Propridades Privadas**

Nossa entidade `Employee` encapsula suas propriedades como privadas, seguindo o princípio do encapsulamento. Isso garante que os dados só podem ser modificados através dos métodos públicos da classe, mantendo a integridade dos dados.

```typescript
private readonly id: string;
private name: string;
private jobRole: string;
private salary: Salary;
private registration: EmployeeRegistration;
private readonly createdAt: Date;
private updatedAt: Date;
```

2. **Construtor Rico**

O construtor da entidade não é apenas um inicializador de propriedades - ele garante que um Employee só pode ser criado em um estado válido.

```typescript
constructor(
  id: string,
  name: string,
  jobRole: string,
  salary: number,
  registration: number,
  createdAt?: Date,
  updatedAt?: Date
) {
  this.validateEmployee(name, jobRole);
  // ...
}
```

3. **Validações Robustas**

A entidade implementa validações rigorosas para garantir a integridade dos dados:

```typescript
private validateName(name: string): void {
  if (!name || name.trim().length < 2) {
    throw new Error('Employee name must be at least 2 characters long');
  }
  // ...
}
```

4. **Comportamentos de Domínio**

A entidade não é apenas um container de dados - ela implementa comportamentos de negócio relevantes:

```typescript
public giveSalaryIncrease(percentage: number): void {
  this.salary = this.salary.increaseByPercentage(percentage);
  this.updateTimestamp();
}
```

## Conclusão

Nesta sessão, implementamos a entidade `Employee` de uma forma que agora esteja robusta e rica em comportamentos, seguindo os princípios do Domain-Driven Design e boas práticas de orientação a objetos. 

A nossa entidade não é apenas um recipiente de dados - é uma representação fiel das regras de negócio relacionadas a funcionários em nossa aplicação.

Porém, para que tenhamos certeza de que a nossa entidade esteja funcionando corretamente, precisamos testá-la.

Na próxima sessão, vamos escrever alguns testes para garantir que a nossa entidade `Employee` esteja funncionando seguindo as regras de negócio que definimos.

**[Anterior: Sessão 11 ⬅️](11-session.md)** | **[Próximo: Sessão 13 ➡️](13-session.md)**

