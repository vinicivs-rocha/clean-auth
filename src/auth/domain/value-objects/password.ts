export class Password {
  private readonly _value: string;
  private readonly _passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  constructor(value: string) {
    if (!this._passwordRegex.test(value)) {
      throw new Error('Invalid password');
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
