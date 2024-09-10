export interface Session {
  id: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
  expiresAt: Date;
}
