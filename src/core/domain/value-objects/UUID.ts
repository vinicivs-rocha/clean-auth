import { randomUUID, type UUID as UUIDType } from 'crypto';

export class UUID {
  private _value: UUIDType;
  private _uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  constructor(value: UUIDType = randomUUID()) {
    if (!this._uuidRegex.test(value)) {
      throw new Error('Value must be a valid UUID');
    }

    this._value = value;
  }

  get value(): UUIDType {
    return this._value;
  }
}
