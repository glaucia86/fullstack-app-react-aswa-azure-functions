export default class Salary {
  private readonly amount: number;

  constructor(amount: number) {
    this.validateAmount(amount);
    this.amount = amount;
  }

  private validateAmount(amount: number): void {
    // Garante que o salário não seja negativo
    if (amount < 0) {
      throw new Error('Salary cannot be negative');
    }

    // Garante que o salário não seja zero
    if (amount === 0) {
      throw new Error('Salary cannot be zero');
    }

    // Garante que o salário tenha no máximo 2 casas decimais
    const decimalPlaces = amount.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > 2) {
      throw new Error('Salary must have a maximum of 2 decimal places');
    }
  }

  private validateAdjustment(adjustment: number): void {
    if (adjustment < 0) {
      throw new Error('Adjustment must be greater than zero');
    }

    const decimalPlaces = adjustment.toString().split('.')[1]?.length || 0;
    if (decimalPlaces > 2) {
      throw new Error('Adjustment must have a maximum of 2 decimal places');
    }
  }

  public getAmount(): number {
    return this.amount;
  }

  public addAmount(adjustment: number): Salary {
    this.validateAmount(adjustment);
    return new Salary(this.amount + adjustment);
  }

  public subtractAmount(adjustment: number): Salary {
    this.validateAdjustment(adjustment);
    const newAmount = this.amount - adjustment;

    if (newAmount < 0) {
      throw new Error('Salary cannot be negative');
    }

    return new Salary(newAmount);
  }

  public increaseByPercentage(percentage: number): Salary {
    if (percentage <= 0) {
      throw new Error('Percentage must be greater than zero');
    }

    if (percentage > 100) {
      throw new Error('Percentage cannot be greater than 100');
    }

    const increaseAmount = this.amount * (percentage / 100);
    return new Salary(this.amount + increaseAmount);
  }

  public toJSON(): number {
    return this.amount;
  }

  public isEqualTo(otherSalary: Salary): boolean {
    return this.amount === otherSalary.getAmount();
  }
}