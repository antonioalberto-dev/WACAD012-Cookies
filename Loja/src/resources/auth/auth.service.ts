import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";
import { SignupDto, LoginDto } from "./auth.types";

const prisma = new PrismaClient();

export async function signup(data: SignupDto) {
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

export async function login(data: LoginDto) {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      userType: true
    }
  });

  if (!user) {
    throw new Error("Email ou senha inválidos");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Email ou senha inválidos");
  }

  return user;
}

export async function getUserByEmail(email: string) {
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


