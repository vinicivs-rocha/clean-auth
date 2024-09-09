import { Entity } from "@core/domain/entity";
import { Email } from "@core/domain/value-objects/email";
import { UUID } from "@core/domain/value-objects/UUID";
import { Password } from "./value-objects/password";

export interface UserProps {
  id: UUID;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  static create(props: UserProps): User {
    return new User(props)
  }
}