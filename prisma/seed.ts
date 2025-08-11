import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { categories, subcategories } from './constants';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function generateData() {
  //   await prisma.user.create({
  //     data: {
  //       firstName: 'Евгений',
  //       lastName: 'Сметанин',
  //       email: 'e91smet15@gmail.com',
  //       password: hashSync('12345678', 10),
  //       // verified: new Date(),
  //       phone: '+79493492491',
  //     },
  //   });
  //   await prisma.user.create({
  //     data: {
  //       firstName: 'Анна',
  //       lastName: 'Сметанина',
  //       email: 'a94smet07@gmail.com',
  //       password: hashSync('12345678', 10),
  //       // verified: new Date(),
  //       phone: '+79001273594',
  //     },
  //   });

  const categoriesWithSlugs = categories.map((category) => ({
    ...category,
    slug: slugify(category.name, { lower: true }),
  }));
  await prisma.category.createMany({
    data: categoriesWithSlugs,
    skipDuplicates: true,
  });

  const subCategoriesWithSlugs = subcategories.map((subcategory) => ({
    ...subcategory,
    slug: slugify(subcategory.name, { lower: true }),
  }));
  await prisma.subCategory.createMany({
    data: subCategoriesWithSlugs,
    skipDuplicates: true,
  });
}

async function clearData() {
  //await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  //await prisma.$executeRaw`TRUNCATE TABLE "Session" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "SubCategory" RESTART IDENTITY CASCADE`;
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
