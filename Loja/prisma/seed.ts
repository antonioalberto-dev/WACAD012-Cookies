/// <reference types="node" />
import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminType = await prisma.userType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      label: 'admin',
    },
  });

  const clientType = await prisma.userType.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      label: 'client',
    },
  });
  const hashedPassword = await bcrypt.hash('senha123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@webacademy.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@webacademy.com',
      password: hashedPassword,
      userTypeId: 1,
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: 'cliente@webacademy.com' },
    update: {},
    create: {
      name: 'Cliente',
      email: 'cliente@webacademy.com',
      password: hashedPassword,
      userTypeId: 2,
    },
  });
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
