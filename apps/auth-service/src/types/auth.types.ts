export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role?: UserRole;
  created_at: Date;
};

export type CreateUserInput = Omit<User, "id" | "created_at">;