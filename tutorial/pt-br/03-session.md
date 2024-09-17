# Session 03: Definição de Tipos

Nessa sessão, vamos definir a interface `Employee`, que servirá como uma espécie de 'contrato' para a estrutura de dados dos funcionários da nossa aplicação. Isso nos ajudará a manter a consistência dos dados e aproveitar os benefícios da tipagem estática do TypeScript.

> 👉 **Nota**: Se você não estiver familiarizado com o conceito de interfaces, ou até mesmo com o TypeScript, não se preocupe! Estaremos explicando tudo a você ao longo do caminho. Porém, se você quiser aprender mais sobre o TypeScript, a Microsoft disponibiliza um curso totalmente gratuito no Microsoft Learn, que você pode acessar [aqui](https://docs.microsoft.com/learn/paths/build-javascript-applications-typescript/).

## Criando o arquivo de interface do `Employee`

Visando deixar o código mais organizado, vamos criar uma pasta dentro do diretório `src` chamada `types`:

```bash
mkdir src/types
```

Dentro dessa pasta, crie um arquivo chamado: `employee.interface.ts`:

```bash
touch src/types/employee.interface.ts
```

Agora, vamos definir a interface `Employee` com todos os campos necessários para representar um funcionário em nossa aplicação. Adicione o seguinte código ao arquivo `employee.interface.ts`:

<details><summary><b>src/types/employee.interface.ts</b></summary>
<br/>

```typescript
export interface Employee {
  id: string;
  name: string;
  job_role: string;
  salary: number;
  employee_registration: number;
  createdAt: Date;
  updatedAt: Date;
}
```

</details>
<br/>

A interface `Employee` possui os seguintes campos:

- **id**: Identificador único para cada funcionário
- **name**: Nome do funcionário.
- **job_role**: Cargo ou função do funcionário na empresa
- **salary**: Salário do funcionário. Nesse caso depois faremos uma alteração para que ele aceite valores decimais.
- **employee_registration**: Número de registro único para o funcionário dentro da empresa.
- **createdAt**: Data e hora de criação do registro do funcionário.
- **updatedAt**: Data e hora da última atualização do registro do funcionário.

## Mas, por que usar interfaces?

Esta interface `Employee` servirá como um 'contrato' para os objetos relacionados aos funcionários em toda a nossa aplicação. Ao usar esta interface, garantiremos que:

- 🔹Todos os objetos de funcionários terão a mesma estrutura.
- 🔹O TypeScript nos alertará se tentarmos acessar ou atribuir propriedades que não existem na interface.
- 🔹Teremos autocomplete e sugestões do IDE ao trabalhar com objetos de funcionários.

Por exemplo:

```typescript
import { Employee } from './types/employee.interface';

// Cria um objeto `employee` que segue a estrutura da interface `Employee`
const employee: Employee = {
  id: '1',
  name: 'John Doe',
  job_role: 'Software Engineer',
  salary: 5000,
  employee_registration: 12345,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// O TypeScript nos alertará se tentarmos acessar ou atribuir propriedades que não existem na interface
const invalidEmployee: Employee = {
  id: '2',
  name: 'Jane Doe',
  job_role: 'Software Engineer',
  // Error: Property 'salary' is missing in type '{ id: string; name: string; job_role: string; }' but required in type 'Employee'
};
```

## Benefícios da Definição de Tipos

Ao definir tipos claros como a interface `Employee`, nos trará inúmeros benefícios, tais como:

1. **Clareza do código:** Qualquer desenvolvedor pode rapidamente entender a estrutura de dados de um funcionário.
2. **Prevenção de erros:** O TypeScript nos alertará sobre erros de tipo em tempo de compilação, evitando muitos bugs comuns.
3. **Melhor autocompletar:** IDEs podem fornecer sugestões e autocompletar com mais precisão ao trabalhar com objetos `Employee`.
4. **Documentação integrada:** A interface serve como uma forma de documentação embutida, permitindo que outros desenvolvedores entendam rapidamente a estrutura de dados.
5. **Refatoração mais segura:** Se você precisar mudar a estrutura de `Employee`, por exemplo o TypeScript apontará todos os lugares que precisam ser atualizados.

## Conclusão

Nesta sessão, definimos a interface `Employee` para representar a estrutura de dados dos funcionários em nossa aplicação. Esta definição de tipos nos ajudará a manter a consistência dos dados e aproveitar ao máximo as capacidades do TypeScript em nossa aplicação de gerenciamento de funcionários.

Na próxima sessão, criaremos um arquivo que será muito importante para a aplicação. Pois será esse arquivo que fará a ponte entre `Frontend` e `Backend`. Fique ligado!

Até a próxima sessão!

**[Anterior: Sessão 02 ⬅️](02-session.md)** | **[Próximo: Sessão 04 ➡️](04-session.md)**