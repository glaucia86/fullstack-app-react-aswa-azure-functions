# Full Stack Application com React, Azure Static Web Apps e Azure Functions - Parte 01

Link repositório: **[https://github.com/glaucia86/todo-react-aswa-azure-functions](https://github.com/glaucia86/todo-react-aswa-azure-functions)**

## Introdução ao Projeto

O objetivo deste projeto é desenvolver uma aplicação CRUD utilizando React, integrando-a com os serviços Azure. tais como:

- 🔹Azure Static Web Apps
- 🔹Azure Functions
- 🔹Azure Container Apps
- 🔹Azure SQL Database

Além disso, utilizaremos o Prisma como ORM e o GitHub Actions para CI/CD. Este projeto visa demonstrar como combinar essas tecnologias para criar uma aplicação web robusta, escalável e de fácil manutenção.

## Configuração Inicial do Projeto - FrontEnd

Se você não deseja aprender a criar o projeto no lado do FrontEnd, você pode clonar o projeto diretamente da branch `frontend-project` no 
link do repositório: **[fullstack-app-react-aswa-azure-functions](https://github.com/glaucia86/fullstack-app-react-aswa-azure-functions.git)** e executar o comando `npm install` para instalar as dependências necessárias.

```text
https://github.com/glaucia86/fullstack-app-react-aswa-azure-functions/tree/frontend-project
```

```bash
git clone
```

```bash
npm install
```

Abre um terminal e execute o comando:

```bash
npm run dev
```

Abre um outro terminal e execute o comando:

```bash
npm run mock-api
```

> **Nota**: se preferir, você pode executar o comando: `npm run dev-start`. Este comando irá iniciar a aplicação e o `json-server` ao mesmo tempo.

Agora você pode acessar a aplicação no seu navegador através da URL: `http://localhost:5173/`, e ver a aplicação rodando localmente. Se estiver executando como o gif abaixo, então você está no caminho certo:

![Frontend Project](../images/frontend-project.gif)

Agora, se você deseja aprender a criar o projeto desde o início, siga para a próxima sessão.

**[Próximo: Sessão 02 ➡️](02-session.md)**
