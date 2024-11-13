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