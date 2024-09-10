import { type UUID as UUIDType } from 'crypto';

export interface UserCreationData {
  id?: UUIDType;
  email: string;
  password: string;
  isPasswordHashed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
