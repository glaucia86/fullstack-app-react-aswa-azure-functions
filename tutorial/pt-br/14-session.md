# Session 13: Definindo o contrato do Repositório

Nessa sessão, vamos definir o contrato do repositório e também estaremos entendendo também porque fazer isso é importante e como isso pode nos ajudar a manter o código mais organizado e coeso.

### A Importância do Padrão _Repository_ no Domain-Driven Design

O padrão _Repository_ é uma peça fundamental no Domain-Driven Design, atuando como uma ponte elegante entre nosso domínio rico em regras de negócio e a complexidade da persistência de dados. Para entender sua importância, precisamos considerar os diversos benefícios que ele traz para nossa arquitetura.

#### Abstração da Persistência

Ao implementar o _Repository_, criamos uma camada que isola o domínio dos detalhes técnicos do armazenamento de dados. Isso garante um domínio "puro", permitindo mudanças na infraestrutura sem impacto significativo. Por exemplo, migrar do Prisma com Azure Cosmos DB para outro banco seria uma tarefa localizada no Repository, sem afetar o domínio.

Além disso, centralizar a lógica de acesso a dados organiza o código, reduz duplicações e simplifica a manutenção.

#### Separação de Responsabilidades

O _Repository_ separa claramente as responsabilidades: o domínio foca nas regras de negócio, enquanto o _Repository_ gerencia a persistência. Essa divisão permite evoluir o sistema de forma independente – refatorar o domínio sem alterar a persistência e vice-versa.

#### Testabilidade e Qualidade do Código

O padrão facilita os testes ao permitir mocks do Repository para testar o domínio isoladamente, sem depender de um banco de dados real. Nos testes de integração, ele serve como um ponto claro para validar interações com a persistência.

Com isso, temos uma suíte de testes rápida, confiável e fácil de manter, promovendo confiança ao evoluir o sistema.

O padrão _Repository_ não é apenas técnico, mas uma decisão arquitetural estratégica, fundamental para o desenvolvimento, manutenção e evolução sustentável de sistemas robustos.

Agora que entendemos a importância do _Repository_, vamos definir o contrato que ele deve seguir em nossa aplicação.

## Implementando a Interface do Repositório

Vamos criar a interface que define o contrato do nosso repositório `Employee`. Para isso, crie a seguinte estrutura de diretórios e arquivos:

```bash
touch src/domain/repository/employee.repository.ts
```

Agora, adicione o seguinte conteúdo ao arquivo `employee.repository.ts`:

<details><summary><b>src/domain/repository/employee.repository.ts</b></summary>

```typescript
import Employee from "../entities/employee.entity";

export default interface IEmployeeRepository {
  create(employee: Employee): Promise<Employee>;
  findById(id: string): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  update(employee: Employee): Promise<Employee>;
  delete(id: string): Promise<void>;

  findByRegistration(registration: number): Promise<Employee | null>;
}
```

</details>

Nessa interface, definimos os métodos que nosso repositório `IEmployeeRepository` deve implementar:

- `create(employee: Employee): Promise<Employee>`: Cria um novo funcionário.
- `findById(id: string): Promise<Employee | null>`: Busca um funcionário pelo ID.
- `findAll(): Promise<Employee[]>`: Lista todos os funcionários.
- `update(employee: Employee): Promise<Employee>`: Atualiza um funcionário existente.
- `delete(id: string): Promise<void>`: Deleta um funcionário pelo ID.
- `findByRegistration(registration: number): Promise<Employee | null>`: Busca um funcionário pelo número de matrícula.

Esses métodos representam as operações básicas de um repositório, permitindo interagir com a entidade `Employee` de forma genérica e independente da infraestrutura de persistência.

## Conclusão

Nesta sessão, definimos o contrato do repositório `Employee`, estabelecendo as operações básicas que ele deve suportar. Com isso, garantimos uma abstração eficaz da persistência, separação de responsabilidades e facilitamos a testabilidade e manutenção do código.

Esta interface é importante pois:

- Define claramente como nossa aplicação interage com a persistência de dados
- Mantém o domínio independente de detalhes de implementação
- Segue os princípios do DDD e SOLID
- Prepara o terreno para diferentes implementações

Na próxima sessão, vamos começar a implementar a camada de _Application_ que será responsável por: 

- Orquestrar as operações entre a API e o domínio
- Implementar os casos de uso da aplicação
- Gerenciar a conversão entre DTOs e entidades
- Coordenar operações complexas

Até lá!

**[Anterior: Sessão 13 ⬅️](13-session.md)** | **[Próximo: Sessão 15 ➡️](15-session.md)**