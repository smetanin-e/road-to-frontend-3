import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function generateData() {
  await prisma.user.create({
    data: {
      firstName: 'Евгений',
      lastName: 'Сметанин',
      email: 'e91smet15@gmail.com',
      password: hashSync('12345678', 10),
      // verified: new Date(),
      phone: '+79493492491',
    },
  });
  await prisma.user.create({
    data: {
      firstName: 'Анна',
      lastName: 'Сметанина',
      email: 'a94smet07@gmail.com',
      password: hashSync('12345678', 10),
      // verified: new Date(),
      phone: '+79001273594',
    },
  });
}

async function clearData() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await clearData();
    await generateData();
  } catch (error) {
    console.log(error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
