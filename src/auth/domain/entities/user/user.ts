import { Entity } from '@core/domain/entity';
import { Email } from '@core/domain/value-objects/email';
import { UUID } from '@core/domain/value-objects/UUID';
import { Password } from '../../value-objects/password';
import { UserCreationData } from './user-data';

export interface UserProps {
  id: UUID;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  get id(): UUID {
    return this.props.id;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
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
