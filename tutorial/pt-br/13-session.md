# Session 13: Testando a Entidade `Employee`

Nessa sessão, vamos aprender a como testar adequadamente nossa entidade `Employee`, garantindo que todas as regras de negócio estejam funcionando conforme esperado.

Os testes são fundamentais não só para verificar o funcionamento atual, mas também para facilitar e evitar regressões.

> Nota: o objetivo desse curso não é ensinar a escrever testes. Mas, sim a como deixar a sua aplicação mais escalável, robusta e segura com o uso dos serviços do Azure. Estaremos, de forma excepcional nessa sessão explicando de forma basica a como criar testes. Assim sendo, não estaremos testando toda a aplicação, mas sim, somente a entidade `Employee`. Sinta-se a vontade para aprofundar seus conhecimentos em testes ou até mesmo implementar testes mais complexos em toda a aplicação.

## Introdução a Testes de Domínio

No contexto do Domain-Driven Design (DDD), testar entidades de domínio é muito importante pelos seguintes motivos:

- Garantem que as regras de negócio estão sendo aplicadas corretamente.
- Servem como documentação viva do comportamento esperado.
- Facilitam refatorações futuras.
- Previnem regressões.
- Ajudam a manter a integridade do domínio.

Agora que podemos entender de forma básica a importância dos testes de domínio, vamos começar a configurar o ambiente para que possamos testar a entidade `Employee`.

## Configurando o ambiente de testes

Como estamos usando TypeScript em nossa aplicação, precisamos configurar o ambiente de testes adequadamente e garantir uma execução correta dos testes. Para isso, siga os passos abaixo:

1. Vamos instalar toda as dependências necessárias:

```bash
# Dependências principais do Jest e TypeScript
npm install --save-dev jest @types/jest ts-jest ts-node

# Dependências do Babel para suporte ao TypeScript
npm install --save-dev @babel/core @babel/preset-env @babel/preset-typescript
```

2. Agora vamos configurar o Babel, pois ele nos ajuda a transpilar o código TypeScript para JavaScript. Crie um arquivo chamado `.babelrc` na raiz do projeto e adicione o seguinte conteúdo:

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```

3. Crie o arquivo de configuração do Jest chamado `jest.config.ts` na raiz do projeto e adicione o seguinte conteúdo:

```typescript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  verbose: true
};
```

4. Agora é o momento de atualizarmos o arquivo `package.json` para adicionar os scripts de testes. Adicione o seguinte conteúdo:

```json
  "scripts": {
    "build": "tsc",
    "watch": "tsc -w",
    "clean": "rimraf dist",
    "prestart": "npm run clean && npm run build",
    "start": "func start",
    "test": "jest --detectOpenHandles",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
```

5. Por fim, vamos criar uma estrutura organizada para os nossos testes. Crie uma pasta chamada `__tests__` dentro da pasta `src` e adicione um arquivo chamado `employee.test.ts` com o seguinte conteúdo:

```bash
mkdir -p src/domain/entities/__tests__/employee.test.ts
```

Agora vamos começar a escrever os testes para a entidade `Employee`.

## Implementando os testes

Agora vamos implementar os testes para a nossa entidade `Employee`. Nossa suíte de testes será organizada em grupos lógicos, assim caso você queira adicionar mais testes, basta adicionar mais grupos.

<details><summary><b>src/domain/entities/__tests__/employee.spec.ts</b></summary>

```typescript
import Employee from "../employee";

describe('Test Employee Entity', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Dados válidos para reutilizar nos testes
  const validEmployeeData = {
    id: 'emp-123',
    name: 'John Doe',
    jobRole: 'Software Engineer',
    salary: 5000,
    registration: 123456
  };

  describe('Employee Creation', () => {
    it('should create a valid employee', () => {
      const employee = new Employee(
        validEmployeeData.id,
        validEmployeeData.name,
        validEmployeeData.jobRole,
        validEmployeeData.salary,
        validEmployeeData.registration
      );

      expect(employee.getId()).toBe(validEmployeeData.id);
      expect(employee.getName()).toBe(validEmployeeData.name);
      expect(employee.getJobRole()).toBe(validEmployeeData.jobRole);
      expect(employee.getSalary()).toBe(validEmployeeData.salary);
      expect(employee.getEmployeeRegistration()).toBe(validEmployeeData.registration);
      expect(employee.getCreatedAt()).toBeInstanceOf(Date);
      expect(employee.getUpdatedAt()).toBeInstanceOf(Date);
    });

    describe('Name Validation', () => {
      it('should throw error when name is too short', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            'J',
            validEmployeeData.jobRole,
            validEmployeeData.salary,
            validEmployeeData.registration
          );
        }).toThrow('Employee name must be at least 2 characters long');
      });

      it('should throw error when name is too long', () => {
        const longName = 'a'.repeat(101);
        expect(() => {
          new Employee(
            validEmployeeData.id,
            longName,
            validEmployeeData.jobRole,
            validEmployeeData.salary,
            validEmployeeData.registration
          );
        }).toThrow('Employee name cannot exceed 100 characters');
      });

      it('should throw error when name contains invalid characters', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            'John@Doe123',
            validEmployeeData.jobRole,
            validEmployeeData.salary,
            validEmployeeData.registration
          );
        }).toThrow('Employee name contains invalid characters');
      });
    });

    describe('Job Role Validation', () => {
      it('should throw error when job role is invalid', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            '',
            validEmployeeData.salary,
            validEmployeeData.registration
          );
        }).toThrow('Job role must be at least 2 characters long');
      });

      it('should throw error when job role is too long', () => {
        const longRole = 'a'.repeat(51);
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            longRole,
            validEmployeeData.salary,
            validEmployeeData.registration
          );
        }).toThrow('Job role cannot exceed 50 characters');
      });
    });

    describe('Salary Validation', () => {
      it('should throw error when salary is negative', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            validEmployeeData.jobRole,
            -5000,
            validEmployeeData.registration
          );
        }).toThrow('Salary cannot be negative');
      });

      it('should throw error when salary is zero', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            validEmployeeData.jobRole,
            0,
            validEmployeeData.registration
          );
        }).toThrow('Salary cannot be zero');
      });
    });

    describe('Registration Validation', () => {
      it('should throw error when registration is invalid (less than 6 digits)', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            validEmployeeData.jobRole,
            validEmployeeData.salary,
            12345
          );
        }).toThrow('Employee registration must be exactly 6 digits');
      });

      it('should throw error when registration is invalid (more than 6 digits)', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            validEmployeeData.jobRole,
            validEmployeeData.salary,
            1234567
          );
        }).toThrow('Employee registration must be exactly 6 digits');
      });

      it('should throw error when registration is not an integer', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            validEmployeeData.jobRole,
            validEmployeeData.salary,
            123456.7
          );
        }).toThrow('Employee registration must be an integer number');
      });

      it('should throw error when registration is negative', () => {
        expect(() => {
          new Employee(
            validEmployeeData.id,
            validEmployeeData.name,
            validEmployeeData.jobRole,
            validEmployeeData.salary,
            -123456
          );
        }).toThrow('Employee registration must be greater than 0 and not negative');
      });
    });
  });

  describe('Employee Updates', () => {
    let employee: Employee;

    beforeEach(() => {
      employee = new Employee(
        validEmployeeData.id,
        validEmployeeData.name,
        validEmployeeData.jobRole,
        validEmployeeData.salary,
        validEmployeeData.registration
      );
    });

    it('should update employee name', () => {
      const newName = 'John Smith';
      employee.updateName(newName);
      expect(employee.getName()).toBe(newName);
    });

    it('should update job role', () => {
      const newRole = 'Senior Software Engineer';
      employee.updateJobRole(newRole);
      expect(employee.getJobRole()).toBe(newRole);
    });

    it('should give salary increase', () => {
      const increasePercentage = 10;
      const originalSalary = employee.getSalary();
      const expectedSalary = originalSalary * (1 + increasePercentage / 100);

      employee.giveSalaryIncrease(increasePercentage);

      expect(employee.getSalary()).toBe(expectedSalary);
    });

    it('should throw error when salary increase is greater than 100%', () => {
      expect(() => {
        employee.giveSalaryIncrease(101);
      }).toThrow('Percentage cannot be greater than 100');
    });

    it('should update timestamps when making changes', () => {
      const originalUpdatedAt = employee.getUpdatedAt();
      jest.advanceTimersByTime(1000);
      employee.updateName('John Smith');

      expect(employee.getUpdatedAt().getTime())
        .toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should maintain createdAt timestamp after updates', () => {
      const originalCreatedAt = employee.getCreatedAt();
      employee.updateName('John Smith');

      expect(employee.getCreatedAt()).toEqual(originalCreatedAt);
    });
  });

  describe('Employee Serialization', () => {
    it('should correctly serialize to JSON', () => {
      const employee = new Employee(
        validEmployeeData.id,
        validEmployeeData.name,
        validEmployeeData.jobRole,
        validEmployeeData.salary,
        validEmployeeData.registration
      );

      const json = employee.toJSON();

      expect(json).toMatchObject({
        id: validEmployeeData.id,
        name: validEmployeeData.name,
        job_role: validEmployeeData.jobRole,
        salary: validEmployeeData.salary,
        employee_registration: validEmployeeData.registration
      });

      expect(json.created_at).toBeInstanceOf(Date);
      expect(json.updated_at).toBeInstanceOf(Date);
    });
  });
});
```

</details>

Ufa! Muita coisa, não é mesmo? Mas, nesse caso estamos testando:

- **Criação Válida de um Funcionário**
   - Verifica se um funcionário é criado corretamente com dados válidos.

- **Validações de Nome**
   - Verifica se o nome é muito curto ou muito longo ou contém caracteres inválidos.

- **Validações de Cargo**
  - Verifica se um determinado cargo está escrito de forma muito curta, longo ou num formato inválido.

- **Validações de Salário**
  - Verifica se o salário é negativo ou zero.
  - Verifica se o salário é aumentado corretamente.

- **Validações de Registro do Funcionário**
  - Verifica se o registro do funcionário é um número inteiro, positivo e com 6 dígitos.
  - Verifica também se o número de registro do funcionário é um número negativo
  
- **Atualizações do Funcionário**
   - Verifica se o nome, cargo e salário do funcionário são atualizados corretamente.
   - Verifica se o salário é aumentado corretamente.
   - Verifica se os timestamps são atualizados corretamente.
- Serialização do Funcionário
   - Verifica se o funcionário é corretamente serializado para JSON.
   - Verifica também se todas as propriedades estão corretas.

## Executando os testes

Agora que temos os testes implementados, vamos executá-los para garantir que tudo está funcionando corretamente. Execute os seguintes comandos em terminais diferentes, lembrando que deve ser executado dentro da pasta `api`:

```bash
npm test               # Executa todos os testes uma vez
npm run test:watch    # Executa em modo watch (útil durante o desenvolvimento)
npm run test:coverage # Executa e gera relatório de cobertura
```

## Analisando a cobertura de testes

Execute o comando `npm run test:coverage` para gerar um relatório de cobertura de testes. O relatório será gerado na pasta `coverage` e você pode abri-lo em seu navegador para analisar a cobertura de testes.

![alt text](../images/test-coverage.png)

E no terminal, você verá algo parecido com isso:

```bash
---------------------------|---------|----------|---------|---------|-------------------
| File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ----------- | ------- | -------- | ------- | ------- | ----------------- |
| All files   | 78.16   | 63.88    | 80.64   | 78.16   |
| entities    | 93.02   | 92.3     | 94.11   | 93.02   |
| employee.ts | 93.02   | 92.3     | 94.11   | 93.02   | 61,108-109        |
```

Esse relatório de cobertura nos mostra:

- Linhas de código testadas
- Branches (condicionais) testados
- Funções testadas

Sempre que você adicionar ou modificar código, execute os testes e verifique a cobertura para garantir que tudo está funcionando conforme esperado. Isso é fundamental para manter a qualidade do código e evitar regressões.

## Boas práticas em testes

**1. Arrange-Act-Assert**: Organize seus testes em três partes: preparação (arrange), execução (act) e verificação (assert). Isso torna o teste mais legível e fácil de entender. Veja um exemplo:

```typescript
it('should update employee name', () => {
  // Arrange
  const employee = new Employee(/* ... */);
  const newName = 'John Smith';

  // Act
  employee.updateName(newName);

  // Assert
  expect(employee.getName()).toBe(newName);
});
```

**2.Testes Descritivos**: Dê nomes descritivos aos seus testes para que seja fácil entender o que está sendo testado. Evite nomes genéricos como `test1`, `test2`, etc.

```typescript
// ❌ Ruim
it('should work', () => {})

// ✅ Bom
it('should throw error when name contains invalid characters', () => {})
```

**3.Dados de Teste Consistentes**: Use dados consistentes e reutilizáveis em seus testes. Isso facilita a manutenção e evita repetição de código.

```typescript
const validEmployeeData = {
  id: 'emp-123',
  name: 'John Doe',
  // ...
};
```

## Conclusão

Nesta sessão, alcançamos um marco importante no desenvolvimento da nossa aplicação ao estabelecer uma estrutura robusta de testes para nossa entidade Employee. A configuração cuidadosa do ambiente de testes, utilizando TypeScript, nos proporciona uma base sólida para garantir a qualidade e confiabilidade do nosso código.

A implementação do TypeScript em nosso ambiente de testes não é apenas uma escolha técnica, mas uma decisão estratégica que nos permite detectar erros em tempo de compilação e fornecer um melhor suporte de ferramentas durante o desenvolvimento. Esta tipagem forte nos ajuda a evitar erros comuns e torna nosso código mais seguro e mais fácil de manter.

A capacidade de gerar relatórios detalhados de cobertura de código nos oferece visibilidade clara sobre quais partes do nosso domínio estão adequadamente testadas e quais áreas podem precisar de atenção adicional. Estes relatórios servem não apenas como métrica de qualidade, mas também como guia para nosso desenvolvimento contínuo, ajudando-nos a identificar pontos cegos em nossa suíte de testes.

A consistência do ambiente de desenvolvimento que estabelecemos é fundamental para o trabalho em equipe. Cada desenvolvedor que trabalha no projeto pode confiar que os testes serão executados de maneira idêntica em sua máquina local, reduzindo significativamente o risco de problemas relacionados a diferenças de ambiente. Esta padronização também facilita a integração contínua e a implantação do nosso código.

O aspecto mais significativo desta sessão, no entanto, é como nossos testes agora atuam como guardiões das regras de negócio do nosso domínio. Cada teste que escrevemos não é apenas uma verificação técnica, mas uma afirmação explícita de como nossa entidade Employee deve se comportar segundo as regras do negócio. Isso nos dá confiança para evoluir nossa aplicação, sabendo que qualquer violação dessas regras será imediatamente detectada por nossa suíte de testes.

Com esta base estabelecida, estamos bem posicionados para avançar para a próxima fase do nosso desenvolvimento, onde implementaremos a camada de persistência através dos repositories. A confiança proporcionada por nossa suíte de testes nos permitirá fazer essa implementação com a certeza de que o comportamento do nosso domínio permanecerá íntegro.

## Próxima Sessão: Implementando os Repositories

Na próxima sessão, vamos definir o contrato do repositório e entender a importância do padrão Repository no Domain-Driven Design. Aprenderemos:

- A importância do padrão Repository no Domain-Driven Design.
- Como o Repository isola o domínio da persistência.
- Como definir o contrato do repositório `IEmployeeRepository`.

Vamos continuar a jornada de desenvolvimento da nossa aplicação e explorar como os repositories nos ajudam a manter a integridade do nosso domínio e a separar as preocupações de persistência do restante da aplicação. E, nos vemos na próxima sessão!

**[Anterior: Sessão 12 ⬅️](12-session.md)** | **[Próximo: Sessão 14 ➡️](14-session.md)**

