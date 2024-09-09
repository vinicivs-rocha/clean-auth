export class Email {
  private readonly _value: string;
  private readonly _emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(value: string) {
    if (!this._emailRegex.test(value)) {
      throw new Error('Invalid email address');
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
