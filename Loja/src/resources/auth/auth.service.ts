import { PrismaClient, User } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { SignupDto } from "./auth.types";

const prisma = new PrismaClient();

export async function signup(data: SignupDto): Promise<User> {
  const { name, email, password } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      userTypeId: 2,
    }
  });

  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      userType: true
    }
  });
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
