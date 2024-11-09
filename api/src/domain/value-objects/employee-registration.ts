export default class EmployeeRegistration {
  private readonly registrationNumber: number;

  constructor(registrationNumber: number) {
    this.validateRegistrationNumber(registrationNumber);
    this.registrationNumber = registrationNumber;
  }

  private validateRegistrationNumber(registrationNumber: number): void {
    // Vamos validar se o número de registro do funcionário é maior que 0 e não seja número negativo
    if (registrationNumber <= 0) {
      throw new Error('Employee registration must be greater than 0 and not negative');
    }

    // Vamos converter para string para verifiar o comprimento do número de registro do funcionário
    const registrationNumberString = registrationNumber.toString();

    // Verifica se tem entre 5 e 6 dígitos (baseado no formato do FrontEnd)
    if (registrationNumberString.length < 5 || registrationNumberString.length > 6) {
      throw new Error('Employee registration must be between 5 and 6 digits');
    }

    // Verifica se o número de registro do funcionário é um número inteiro
    if (!Number.isInteger(registrationNumber)) {
      throw new Error('Employee registration must be an integer number');
    }
  }

  public getValue(): number {
    return this.registrationNumber;
  }

  public isEqualTo(otherRegistration: EmployeeRegistration): boolean {
    return this.registrationNumber === otherRegistration.getValue();
  }

  // Serializa o objeto para um número
  public toJSON(): number {
    return this.registrationNumber;
  }
}