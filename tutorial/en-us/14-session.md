# Session 13: Defining the Repository Contract

In this session, we will define the repository contract and understand why this is important and how it can help us keep our code more organized and cohesive.

### The Importance of the _Repository_ Pattern in Domain-Driven Design

The _Repository_ pattern is a fundamental piece in Domain-Driven Design, acting as an elegant bridge between our domain, rich in business rules, and the complexity of data persistence. To understand its importance, we need to consider the various benefits it brings to our architecture.

#### Persistence Abstraction

By implementing the _Repository_, we create a layer that isolates the domain from the technical details of data storage. This ensures a "pure" domain, allowing infrastructure changes without significant impact. For example, migrating from Prisma with Azure Cosmos DB to another database would be a task localized in the Repository, without affecting the domain.

Additionally, centralizing data access logic organizes the code, reduces duplication, and simplifies maintenance.

#### Separation of Responsibilities

The _Repository_ clearly separates responsibilities: the domain focuses on business rules, while the _Repository_ manages persistence. This division allows the system to evolve independently – refactoring the domain without altering persistence and vice versa.

#### Testability and Code Quality

The pattern facilitates testing by allowing Repository mocks to test the domain in isolation, without relying on a real database. In integration tests, it serves as a clear point to validate interactions with persistence.

With this, we achieve a test suite that is fast, reliable, and easy to maintain, fostering confidence when evolving the system.

The _Repository_ pattern is not merely technical but a strategic architectural decision, essential for the sustainable development, maintenance, and evolution of robust systems.

Now that we understand the importance of the _Repository_, let's define the contract it should follow in our application.

## Implementing the Repository Interface

Let's create the interface that defines the contract for our `Employee` repository. For this, create the following directory and file structure:

```bash
touch src/domain/repository/employee.repository.ts
```

Now, add the following content to the `employee.repository.ts` file:

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
</br>

In this interface, we define the methods our `IEmployeeRepository` repository must implement:

- `create(employee: Employee): Promise<Employee>`: Creates a new employee.
- `findById(id: string): Promise<Employee | null>`: Retrieves an employee by ID.
- `findAll(): Promise<Employee[]>`: Lists all employees.
- `update(employee: Employee): Promise<Employee>`: Updates an existing employee.
- `delete(id: string): Promise<void>`: Deletes an employee by ID.
- `findByRegistration(registration: number): Promise<Employee | null>`: Retrieves an employee by registration number.

These methods represent the basic operations of a repository, enabling interaction with the `Employee` entity in a generic and infrastructure-independent way.

## Conclusion

In this session, we defined the `Employee` repository contract, establishing the basic operations it must support. With this, we ensure effective persistence abstraction, separation of responsibilities, and improved code testability and maintenance.

This interface is important because it:

- Clearly defines how our application interacts with data persistence
- Keeps the domain independent of implementation details
- Aligns with DDD and SOLID principles
- Lays the groundwork for different implementations

In the next session, we will start implementing the _Application_ layer, which will be responsible for:

- Orchestrating operations between the API and the domain
- Implementing the application use cases
- Managing conversions between DTOs and entities
- Coordinating complex operations

See you then!

**[Previous: Session 13 ⬅️](13-session.md)** | **[Next: Session 15 ➡️](15-session.md)**
