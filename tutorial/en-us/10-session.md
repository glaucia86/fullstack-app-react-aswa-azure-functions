# Session 10: Project Backend Setup with Azure Functions

Hello, developers! 👋

We are now in the second phase of our workshop! In this session, we’ll begin setting up our Backend using Azure Functions with TypeScript (programming model v4). This will be the first step toward creating a robust and scalable API that will replace our current mock.

In the Backend, we will use the following technologies:

- 🔹**[Azure Functions (TypeScript programming model v4)](https://learn.microsoft.com/en-us/azure/azure-functions/)**
- 🔹**[Azure Cosmos DB for MongoDB](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/introduction)**
- 🔹**[Prisma](https://www.prisma.io/)**
- 🔹And much more...

Shall we get started? 🚀

## Prerequisites

Before starting, you will need to have installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (preferably version 18 or above)
- [TypeScript](https://www.typescriptlang.org/)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-csharp#install-the-azure-functions-core-tools)
- **[Azure Functions extension v1.10.4 or higher](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)**
- An [Azure account](https://azure.microsoft.com/en-us/free/)

> 👉 **Note:** If you don’t have an Azure account, you can create one for free [here](https://azure.microsoft.com/en-us/free/).

After installing the necessary tools, open the terminal within Visual Studio Code to check if the Azure Functions Core Tools is installed correctly. Run the command below:

```bash
func --version
```

If everything is correct, you will see the installed version of Azure Functions Core Tools.

## Understanding Azure Functions

Before we start coding, it's important to understand what Azure Functions is and how it works.

Azure Functions is a serverless computing solution that lets you run small pieces of code (called "functions") without worrying about the infrastructure. With Azure Functions, functions are triggered by various events such as data changes, message triggers, and timers.

In summary:

- 🔹It’s a serverless compute service that lets you run code on demand.
- 🔹You pay only for the runtime of the code. Pay-as-you-go.
- 🔹Automatically scales based on demand.
- 🔹Supports multiple programming languages, including JavaScript, TypeScript, Python, C#, Java, among others.
- 🔹Supports various trigger types like HTTP, Blob Storage, Cosmos DB, Event Grid, among others.
- 🔹Ideal for creating APIs, event processing, automation, integration, microservices, and more.

The programming model v4 we’ll use brings several improvements over the previous model, such as:

- 🔹More modern and intuitive syntax.
- 🔹Better support for TypeScript.
- 🔹Improved performance.
- 🔹More organized project structure.

If you want to learn more about Azure Functions and the new programming model v4, check out:

- 📚 **[Quickstart: Create a JavaScript function in Azure using Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node?pivots=nodejs-model-v4)**
- 📚 **[Azure Functions: Node.js v4 programming model is Generally Available](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/azure-functions-node-js-v4-programming-model-is-generally/ba-p/3929217)**

Now that you know what Azure Functions is and how it works, let’s start setting up our project.

## Creating the Azure Functions Project

Let's create our Azure Functions project following these steps:

1. Create a new folder for the Backend project. You can name this folder `api`.

```bash
mkdir api
cd api
```

2. In Visual Studio Code, use the command to create a new project:

- Press `F1` and type `Azure Functions: Create New Project`.
- Select the `api` folder.
- Choose `TypeScript` as the language.
- Select `Model V4` as the programming model.
- Choose the `Http trigger` template.
- Enter the function name: `employees`.
- Visual Studio Code will create the Azure Functions project structure.

See the entire creation process in the GIF below:

![Azure Functions](../images/create-functions-project.gif)

## Project Structure

After creating the project, you’ll see the following folder and file structure:

```bash
api/
 ├── src/
 │   ├── functions/
 │   │   └── employees/
 │   │       └── index.ts
 │   └── index.ts
 ├── .funcignore
 ├── .gitignore
 ├── host.json
 ├── local.settings.json
 ├── package.json
 └── tsconfig.json
```

Let's understand what each file and folder does:

- `src/`: Folder where the Azure Functions are located.
- `src/functions/employees.ts`: Folder for the `employees` function.
- `src/index.ts`: Main file that exports all functions.
- `host.json`: Global host configurations for Functions.
- `local.settings.json`: Local settings and environment variables.
- `package.json`: Project dependencies file.
- `tsconfig.json`: TypeScript configuration file.

## Analyzing the Generated Code

Let’s go through the code generated by Visual Studio Code for the `employees` function:

<details><summary><b>src/functions/employees.ts</b></summary>
<br/>

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function employees(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
};

app.http('employees', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: employees
});
```

</details>
<br/>

### Imports

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
```

- `app`: Main object for configuring functions.
- `HttpRequest`: TypeScript interface for HTTP requests.
- `HttpResponseInit`: Interface for HTTP responses.
- `InvocationContext`: Function’s execution context.

### Function Definition

```typescript
export async function employees(
    request: HttpRequest, 
    context: InvocationContext
): Promise<HttpResponseInit>
```

- Asynchronous function with two parameters:

  - `request`: Contains HTTP request data (query params, body, headers, etc.)
  - `context`: Provides access to the execution context (logging, bindings, etc.)

- Returns a Promise of `HttpResponseInit` (HTTP response).

### Logging

```typescript
context.log(`Http function processed request for url "${request.url}"`);
```

- Shows the use of the integrated logging system.
- Useful for debugging and monitoring.
- Logs are automatically integrated with Azure Application Insights.

### Request Processing

```typescript
const name = request.query.get('name') || await request.text() || 'world';
```

Demonstrates different ways to access request data:

- `request.query.get()`: Accesses query parameters (?name=value).
- `request.text()`: Accesses the request body.
- Uses fallback to ‘world’ if no value is provided.

### Route Configuration

```typescript
app.http('employees', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: employees
});
```

- `'employees'`: Unique name for the function.
- `methods`: Array of allowed HTTP methods.
- `authLevel`: Required authorization level.

  - `'anonymous'`: Allows access without authentication.
  - Other levels: `'function'`, `'admin'`.
- `handler`: Function to be executed.

## Testing the Function Locally

To test the function locally, open the terminal in Visual Studio Code and run the command:

```bash
cd api
npm start
```

Azure Functions will start the server locally, and you can access the function in the browser via the link `http://localhost:7071/api/employees`

You should see the message `Hello, world!` in the browser, as shown in the image below:

![alt text](../images/functions-browser.png)

Now, let's test with a parameter. Keep the server running and open the browser.

Add `?name=John` to the end of the URL and press `Enter`. You should see the message `Hello, John!` in the browser.

```bash
# Via query parameter
curl "http://localhost:7071/api/employees?name=John"

# Via POST with body
curl -X POST -H "Content-Type: text/plain" -d "John" \
  "http://localhost:7071/api/employees"
```

## Customizing the Response

Let’s do a small exercise by customizing the `employees` function response.

Open the file `src/functions/employees.ts` in Visual Studio Code and make the following changes:

<details><summary><b>src/functions/employees.ts</b></summary>
<br/>

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext

 } from "@azure/functions";
import { timeStamp } from "console";

export async function employees(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return {
        jsonBody: {
            message: "Hello", timeStamp: new Date()
        },
        headers: {
            'Content-Type': 'application/json'
        },
        status: 200
    }
};

app.http('employees', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: employees
});
```

</details>
<br/>

Now, restart the local server and access the function in the browser. You should see the customized JSON response:

```json
{
  "message": "Hello",
  "timeStamp": "2021-10-01T20:00:00.000Z"
}
```

## Conclusion

In this session, you learned how to create an Azure Functions project with the new programming model v4. Additionally, you explored the folder and file structure generated by Visual Studio Code and how to run the project locally.

In the next session, we’ll begin installing the other dependencies we'll use in this project, such as Azure Cosmos DB, Prisma, and others.

**[Previous: Session 09 ⬅️](09-session.md)** | **[Next: Session 11 ➡️](11-session.md)**