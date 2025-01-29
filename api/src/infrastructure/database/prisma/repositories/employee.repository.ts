import { PrismaClient } from "@prisma/client";
import { Employee } from "../../../../domain/entities/employee.entity";
import { IEmployeeRepository } from "../../../../domain/repository/employee.repository";

export class PrismaEmployeeRepository implements IEmployeeRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Employee[]> {
    try {
      const employees = await this.prisma.employee.findMany();

      return employees.map(emp => new Employee(
        emp.id,
        emp.name,
        emp.job_role,
        emp.salary,
        emp.employee_registration,
        emp.createdAt,
        emp.updatedAt
      ));
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`Error to find all employees: ${err.message}`);
    }
  }

  async findById(id: string): Promise<Employee | null> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id }
      });

      if (!employee) return null;

      return new Employee(
        employee.id,
        employee.name,
        employee.job_role,
        employee.salary,
        employee.employee_registration,
        employee.createdAt,
        employee.updatedAt
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`Error to find employee by id: ${err.message}`);
    }
  }

  async findByRegistration(employeeRegistration: number): Promise<Employee | null> {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { employee_registration: employeeRegistration }
      });

      if (!employee) return null;

      return new Employee(
        employee.id,
        employee.name,
        employee.job_role,
        employee.salary,
        employee.employee_registration,
        employee.createdAt,
        employee.updatedAt
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`Error to find employee by registration: ${err.message}`);
    }
  }

  async create(employeeData: Omit<Employee, "id">): Promise<Employee> {
    try {
      const employee = await this.prisma.employee.create({
        data: employeeData
      });

      return new Employee(
        employee.id,
        employee.name,
        employee.job_role,
        employee.salary,
        employee.employee_registration,
        employee.createdAt,
        employee.updatedAt
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`Error to create employee: ${err.message}`);
    }
  }

  async update(id: string, employeeData: Partial<Omit<Employee, "id" | "createdAt" | "employee_registration">>): Promise<Employee> {
    try {
      const employee = await this.prisma.employee.update({
        where: { id },
        data: {
          ...employeeData,
          updatedAt: new Date()
        }
      });

      return new Employee(
        employee.id,
        employee.name,
        employee.job_role,
        employee.salary,
        employee.employee_registration,
        employee.createdAt,
        employee.updatedAt
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`Error to update employee: ${err.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.employee.delete({
        where: { id }
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`Error to delete employee: ${err.message}`);
    }
  }
}