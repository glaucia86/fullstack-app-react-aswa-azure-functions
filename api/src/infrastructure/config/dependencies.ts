import { IEmployeeRepository } from "../../domain";
import { PrismaEmployeeRepository } from "../database";

export class DependencyContainer {
  private static employeeRepository: IEmployeeRepository;

  static getEmployeeRepository(): IEmployeeRepository {
    if (!this.employeeRepository) {
      this.employeeRepository = new PrismaEmployeeRepository();
    }

    return this.employeeRepository;
  }
}