import { PrismaClient } from "@prisma/client";
import { IEmployeeRepository } from "../../domain";
import { PrismaEmployeeRepository } from "../database";

export class DependencyContainer {
  private static prismaClient: PrismaClient = new PrismaClient();
  private static repositories = {
    employee: null as IEmployeeRepository | null
  };

  static getEmployeeRepository(): IEmployeeRepository {
    if (!this.repositories.employee) {
      this.repositories.employee = new PrismaEmployeeRepository(this.prismaClient);
    }

    return this.repositories.employee;
  }

  static async dispose(): Promise<void> {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
      this.prismaClient = null;
      this.repositories.employee = null;
    }
  }
}