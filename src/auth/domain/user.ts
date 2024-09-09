import { Entity } from '@core/domain/entity';
import { Email } from '@core/domain/value-objects/email';
import { UUID } from '@core/domain/value-objects/UUID';
import { UserCreationData } from './user-data';
import { Password } from './value-objects/password';

export interface UserProps {
  id: UUID;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  static create({
    id,
    email,
    password,
    createdAt,
    updatedAt,
  }: UserCreationData): User {
    return new User({
      id: new UUID(id),
      email: new Email(email),
      password: new Password(password),
      createdAt: createdAt ?? new Date(),
      updatedAt,
    });
  }
}
