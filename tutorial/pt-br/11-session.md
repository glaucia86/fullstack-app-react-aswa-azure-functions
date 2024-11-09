# Camada de Domain - Implementando Value Objects

Nessa sessão, vamos iniciar a implementação da camada de domínio da nossa aplicação. Pois estaremos adotando o padrão de arquitetura de software chamado de **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html)** e incluso conceitos de **[SOLID](https://en.wikipedia.org/wiki/SOLID)**.

Estaremos ensinando o passo a passo para que você possa aprender a criar uma aplicação com uma arquitetura bem definida, organizada e que visa a manutenibilidade e escalabilidade em caso de ampliação do projeto.

Nesse primeiro momento, vamos criar os _Value Objects_ que serão utilizados na nossa aplicação.

## Introdução a camada de Domain

A camada de Domain é o coração da nossa aplicação. Pois nela contém: 

- 🔹 As entedidades principais do negócio
- 🔹 As regras de negócio fundamentais
- 🔹 As interfaces que definem como interagimos com essas entidades

No nosso caso, estamos criando um sistema de gerenciamento de funcionários, então a nossa principal entidade será `Employee`.

## Criando a estrutura de arquivos

Vamos agora criar a estrutura necessária para a camada de Domain para a nossa aplicação. Abre o terminal e execute os comandos abaixo:

```bash
mkdir -p api/src/domain/entities
mkdir -p api/src/domain/repositories
mkdir -p api/src/domain/exceptions
mkdir -p api/src/domain/value-objects
```

O que cada diretório representa?

- 📂 `entities`: Contém as entidades principais do negócio
- 📂 `repositories`: Contém as interfaces que definem como interagimos com as entidades
- 📂 `exceptions`: Contém as exceções personalizadas da nossa aplicação

Bom, agora que já criamos e já entendemos o que cada diretório representa, vamos seguir para a implementação dos Value Objects.

## Implementando _Value Objects_

Antes de criar a nossa entidade principal, vamos implementar alguns _Value Objects_ que serão utilizados na nossa aplicação. 

Os _Value Objects_ são objetos imutáveis que não tem identidade própria. Mas, que encapsulam um valor e que garantirá a validade desse valor através de uma lógica. No contexto do nosso `Employee`, vamos criar Value Objects para as propriedades que precisam de validações específicas. Nesse caso será:

- `salary`
- `employee_registration`

Vá até o diretório `api/src/domain/value-objects` e crie um arquivo chamado `employee-registration.ts` e adicione o seguinte código:

<details><summary><b>api/src/domain/value-objects/employee-registration.ts</b></summary>

```typescript
export default class EmployeeRegistration {
  private readonly registrationNumber: number;

  constructor(registrationNumber: number) {
    this.validateRegistrationNumber(registrationNumber);
    this.registrationNumber = registrationNumber;
  }

  private validateRegistrationNumber(registrationNumber: number): void {
    // Vamos validar se o número de registro do funcionário é maior que 0 e não seja número negativo
    if (registrationNumber <= 0) {
      throw new Error('Employee registration must be greater than 0 and not negative');
    }

    // Vamos converter para string para verifiar o comprimento do número de registro do funcionário
    const registrationNumberString = registrationNumber.toString();

    // Verifica se tem entre 5 e 6 dígitos (baseado no formato do FrontEnd)
    if (registrationNumberString.length < 5 || registrationNumberString.length > 6) {
      throw new Error('Employee registration must be between 5 and 6 digits');
    }

    // Verifica se o número de registro do funcionário é um número inteiro
    if (!Number.isInteger(registrationNumber)) {
      throw new Error('Employee registration must be an integer number');
    }
  }

  public getValue(): number {
    return this.registrationNumber;
  }

  public isEqualTo(otherRegistration: EmployeeRegistration): boolean {
    return this.registrationNumber === otherRegistration.getValue();
  }

  // Serializa o objeto para um número
  public toJSON(): number {
    return this.registrationNumber;
  }
}
```

</details>
<br/>

Aqui estamos criando um _Value Object_ chamado `EmployeeRegistration` quem tem como principal objetivo:

- 🔹 Validar se o número de registro do funcionário é maior que 0 e não seja número negativo
- 🔹 Validar se o número de registro do funcionário tem entre 5 e 6 dígitos
- 🔹 Validar se o número de registro do funcionário é um número inteiro

Agora, vamos criar o _Value Object_ para a propriedade `salary`. Crie um arquivo chamado `salary.ts` no diretório `api/src/domain/value-objects` e adicione o seguinte código:

<details><summary><b>api/src/domain/value-objects/salary.ts</b></summary>

```typescript
export default class Salary {
  private readonly amount: number;

  constructor(amount: number) {
    this.validateAmount(amount);
    this.amount = amount;
  }

  private validateAmount(amount: number): void {
    // Garante que o salário não seja negativo
    if (amount < 0) {
      throw new Error('Salary cannot be negative');
    }

    // Garante que o salário não seja zero
    if (amount === 0) {
      throw new Error('Salary cannot be zero');
    }

    // Garante que o salário tenha no máximo 2 casas decimais
    const decimalPlaces = amount.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > 2) {
      throw new Error('Salary must have a maximum of 2 decimal places');
    }
  }

  private validateAdjustment(adjustment: number): void {
    if (adjustment < 0) {
      throw new Error('Adjustment must be greater than zero');
    }

    const decimalPlaces = adjustment.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > 2) {
      throw new Error('Adjustment must have a maximum of 2 decimal places');
    }
  }

  public getAmount(): number {
    return this.amount;
  }

  public addAmount(adjustment: number): Salary {
    this.validateAmount(adjustment);
    return new Salary(this.amount + adjustment);
  }

  public subtractAmount(adjustment: number): Salary {
    this.validateAdjustment(adjustment);
    const newAmount = this.amount - adjustment;

    if (newAmount < 0) {
      throw new Error('Salary cannot be negative');
    }

    return new Salary(newAmount);
  }

  public increaseByPercentage(percentage: number): Salary {
    if (percentage <= 0) {
      throw new Error('Percentage must be greater than zero');
    }

    if (percentage > 100) {
      throw new Error('Percentage cannot be greater than 100');
    }

    const increaseAmount = this.amount * (percentage / 100);
    return new Salary(this.amount + increaseAmount);
  }

  public toJSON(): number {
    return this.amount;
  }

  public isEqualTo(otherSalary: Salary): boolean {
    return this.amount === otherSalary.getAmount();
  }
}
```

</details>
<br/>

Aqui estamos criando um _Value Object_ chamado `Salary` quem tem como principal objetivo:

- 🔹 Garantir que o salário não seja negativo
- 🔹 Garantir que o salário não seja zero
- 🔹 Garantir que o salário tenha no máximo 2 casas decimais
- 🔹 Adicionar um valor ao salário. Pois um determinado funcionário sempre pode ter promoções ou ganhar um extra no final do mês
- 🔹 Subtrair um valor do salário. Pois um determinado funcionário pode ter descontos no salário
- 🔹 Aumentar o salário por porcentagem. Pois um determinado funcionário pode ter um aumento de salário
- 🔹 Verificar se o salário é igual a outro salário

## Benefícios dos Value Objects no Domínio da Aplicação

### Encapsulamento de Regras de Negócio

O encapsulamento de regras é um dos principais benefícios dos _Value Objects_. Quando desenvolvemos software empresarial, as regras de negócio tendem a mudar e evoluir com o tempo. 

Por exemplo, hoje o registro do funcionário precisa ter entre 5 e 6 dígitos, mas no futuro isso pode mudar para um formato diferente.

Com _Value Objects_, todas essas regras estão centralizadas em um único lugar. Se precisarmos alterar como validamos o registro de um funcionário, fazemos as alterações apenas na classe `EmployeeRegistration`. Não precisaremos caçar validações espalhadas por todo o código da aplicação. Isso não só torna a manuntenção mais fácil, mas também reduz significativamente a chance de introduzir bugs quando as regras de negócio mudam.

### Poder da Imutabilidade

A imutabilidade é uma característica fundamental dos _Value Objects_ que traz segurança e previsibilidade ao código.

Por exemplo, pense num salário de um funcionário: uma vez que definimos um valor de USD 5.000,00, esse objeto `Salary` específico sempre representará esse valor. Se precisarmos dar um aumento, não modificamos o objeto existente - criamos um novo.

```typescript
const originalSalary = new Salary(5000);
const increasedSalary = originalSalary.addAmount(1000); // Cria um novo objeto

console.log(originalSalary.getAmount()); // Ainda é 5000
console.log(increasedSalary.getAmount()); // Agora é 6000
```

Esta imutabilidade previne uma classe inteira de bugs relacionados a efeitos colaterais. Não há risco de um método alterar acidentalmente o salário em algum lugar inesperado do código, pois os valores, uma vez criados, são imutáveis.

### Segurança de tipos com TypeScript

Como a linguagem principal do workshop é o TypeScript, ele já ajuda a adicionar uma camada extra de segurança aos nossos _Value Objects_. Imagine que em algum lugar do código alguém tente usar um salário como número de registro:

```typescript
// ❌ O TypeScript impede este erro em tempo de compilação
function processEmployeeRegistration(registration: EmployeeRegistration) {
  // ...
}

const salary = new Salary(5000);
processEmployeeRegistration(salary); // Erro de compilação! Pois Salary não é um EmployeeRegistration
```

O sistema de tipos do TypeScdript nos ajuda a pegar estes erros antes mesmo de executar o código. Isso é especialmente valioso em grandes bases de código onde é fácil confundir diferentes tipos de números ou strings.

### Reutilização e Consistência

Os _Value Objects_ promovem a reutilização de código de uma maneira que mantém a consistência em toda a aplicação. Por exemplo, nosso `EmployeeRegistration` pode ser usado não apenas na entidade `Employee`. Mas, em qualquer lugar que precise trabalhar com registros de funcionários.

```typescript
// Em um serviço de RH
class HRService {
    validateTransfer(registration: EmployeeRegistration) {
        // A validação do registro já está garantida pelo Value Object
    }
}

// Em um relatório financeiro
class PayrollReport {
    generateForEmployee(registration: EmployeeRegistration) {
        // Mesmo aqui, o registro é garantidamente válido
    }
}
```

Essa reutilização não é apenas sobre não repetir código - é sobre garantir que as mesmas regras de negócio sejam aplicadas consistentemente em toda a aplicação. Se um registro de funcionário é válido em uma parte do sistema, ele será válido em todas as outras partes.

Além disso, quando as regras de negócio mudam, a alteração em um único _Value Object_ automaticamente se propaga para todos os lugares que o utilizam. Não há risco de atualizar a validação num lugar e esquecer de atualizar em outro.

## Conclusão

Nesta sessão, demos um passo importante na criação da nossa aplicação no lado do BackEnd com a implementação dos _Value Objects_. 

Aprendemos como criar objetos imutáveis que encapsulam regras de negócio específicas para `salary` e `employee_registration`, garantindo a consistência e a integridade dos dados em toda a aplicação.

Vimos que os _Value Objects_ são mais do que simples estruturas de dados - são guardiões das regras de negócio que:

- 🔹 Centralizam a validação de dados
- 🔹 Garantem imutabilidade
- 🔹 Promovem a reutilização de código
- 🔹 Aproveitam o sistema de tipos do TypeScript para maior segurança

Esta base sólida nos permitirá criar o resto da aplicação com maior confiança e manutenibilidade.

Na próxima sessão, mergulharemos na implementação da entidade central da nossa aplicação: o `Employee`. Até lá! 🚀

**[Anterior: Sessão 10 ⬅️](10-session.md)** | **[Próximo: Sessão 12 ➡️](12-session.md)**

