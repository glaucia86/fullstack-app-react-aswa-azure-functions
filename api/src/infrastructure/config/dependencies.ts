import { IEmployeeRepository } from "../../domain/repository/employee.repository";
import { PrismaEmployeeRepository } from "../database/prisma/repositories/employee.repository";

export class DependencyContainer {
  private static employeeRepository: IEmployeeRepository;

  static getEmployeeRepository(): IEmployeeRepository {
    if (!this.employeeRepository) {
      this.employeeRepository = new PrismaEmployeeRepository();
    }

    return this.employeeRepository;
  }
}