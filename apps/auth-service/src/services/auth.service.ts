import { AppError } from "shared";
import bcrypt from "bcryptjs";

import { createUser, findByEmail } from "../repositories/user.repo";
import { RegisterInput } from "../schemas/auth.schema";
import { serializeUser } from "../utils/auth.utils";

export async function register(registerData: RegisterInput) {
  const userExists = await findByEmail(registerData.email);

  if (userExists) throw new AppError(409, "User already exists");

  const passwordHash = await bcrypt.hash(registerData.password, 10);

  const user = await createUser({
    name: registerData.name,
    email: registerData.email,
    password_hash: passwordHash,
    role: "USER",
  });

  return serializeUser(user);
}


