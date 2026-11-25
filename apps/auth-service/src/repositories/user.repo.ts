import { getPool } from "shared";
import { CreateUserInput, User } from "../types/auth.types";

export async function createUser(data: CreateUserInput): Promise<User> {
  const result = await getPool().query<User>(
    `
        INSERT INTO users(name,email,password_hash,role)
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
    [data.name, data.email, data.password_hash, data.role ?? "USER"],
  );
  return result.rows[0];
}

export async function findByEmail(email: string): Promise<User | null> {
  const user = await getPool().query<User>(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );

  return user.rows[0] ?? null;
}
