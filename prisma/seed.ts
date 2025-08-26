import { PrismaClient } from '@prisma/client';

import { categories, subcategories, tags } from './constants';
import slugify from 'slugify';

const prisma = new PrismaClient();

// Хелперы
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFromArray<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

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

  //*========КАТЕГОРИИ===============================
  const categoriesWithSlugs = categories.map((category) => ({
    ...category,
    slug: slugify(category.name, { lower: true }),
  }));
  await prisma.category.createMany({
    data: categoriesWithSlugs,
    skipDuplicates: true,
  });

  //*========ПОД-КАТЕГОРИИ===============================
  const subCategoriesWithSlugs = subcategories.map((subcategory) => ({
    ...subcategory,
    slug: slugify(subcategory.name, { lower: true }),
  }));
  await prisma.subCategory.createMany({
    data: subCategoriesWithSlugs,
    skipDuplicates: true,
  });

  //*========ТЕГИ===============================
  const tagsWithSlugs = tags.map((tag) => ({
    ...tag,
    slug: slugify(tag.name, { lower: true }),
  }));

  await prisma.tag.createMany({
    data: tagsWithSlugs,
    skipDuplicates: true,
  });

  //************************************ */
  //   await prisma.author.create({
  //     data: {
  //       name: 'Джордж Оруэлл',
  //       description: 'Английский писатель и журналист, автор антиутопий.',
  //       books: {
  //         create: [
  //           {
  //             title: '1984',
  //             description: 'Антиутопия о тоталитарном обществе.',
  //             price: 500,
  //             sale: 20,
  //             categoryId: 1, // убедись, что категории и подкатегории с этими id существуют
  //             subcategoryId: 1,
  //             tags: { connect: [{ id: 1 }, { id: 2 }] },
  //             images: {
  //               create: [
  //                 { url: 'https://example.com/1984-cover.jpg' },
  //                 { url: 'https://example.com/1984-back.jpg' },
  //               ],
  //             },
  //           },
  //           {
  //             title: 'Скотный двор',
  //             description: 'Сатирическая повесть-притча о революции.',
  //             price: 350,
  //             categoryId: 1,
  //             subcategoryId: 1,
  //             tags: { connect: [{ id: 3 }] },
  //             images: {
  //               create: [{ url: 'https://example.com/animal-farm.jpg' }],
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });

  //   await prisma.author.create({
  //     data: {
  //       name: 'Фёдор Достоевский',
  //       description: 'Русский писатель, философ и публицист.',
  //       books: {
  //         create: [
  //           {
  //             title: 'Преступление и наказание',
  //             description: 'История студента, совершившего убийство.',
  //             price: 600,
  //             sale: 10,
  //             categoryId: 2,
  //             subcategoryId: 4,
  //             tags: { connect: [{ id: 2 }] },
  //             images: {
  //               create: [{ url: 'https://example.com/crime-and-punishment.jpg' }],
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  //*************************************************************** */
  const authors = [
    {
      name: 'Джордж Оруэлл',
      description: 'Английский писатель и журналист.',
      yearsOfLife: '1903–1950',
    },
    {
      name: 'Фёдор Достоевский',
      description: 'Русский писатель, философ.',
      yearsOfLife: '1821–1881',
    },
    { name: 'Лев Толстой', description: 'Автор эпических романов.', yearsOfLife: '1828–1910' },
    { name: 'Рэй Брэдбери', description: 'Американский фантаст.', yearsOfLife: '1920–2012' },
    { name: 'Агата Кристи', description: 'Королева детектива.', yearsOfLife: '1890–1976' },
    { name: 'Дэн Браун', description: 'Автор триллеров и детективов.', yearsOfLife: '1964–' },
    { name: 'Дж. Р. Р. Толкин', description: 'Создатель Средиземья.', yearsOfLife: '1892–1973' },
    { name: 'Айзек Азимов', description: 'Писатель-фантаст и учёный.', yearsOfLife: '1920–1992' },
    { name: 'Стивен Кинг', description: 'Мастер ужасов.', yearsOfLife: '1947–' },
    {
      name: 'Михаил Булгаков',
      description: 'Русский писатель и драматург.',
      yearsOfLife: '1891–1940',
    },
  ];

  const bookTitles = [
    '1984',
    'Скотный двор',
    'Война и мир',
    'Преступление и наказание',
    'Анна Каренина',
    '451° по Фаренгейту',
    'Марсианские хроники',
    'Десять негритят',
    'Убийство в Восточном экспрессе',
    'Код да Винчи',
    'Ангелы и демоны',
    'Властелин колец',
    'Хоббит',
    'Основание',
    'Конец вечности',
    'Зелёная миля',
    'Сияние',
    'Мастер и Маргарита',
    'Собачье сердце',
    'Тёмная башня',
    'Чужак',
    'Пляска смерти',
    'Коллекционер',
    'Дюна',
    'Мессия Дюны',
    'Дети Дюны',
    'Человек в высоком замке',
    'Убить пересмешника',
    'Гарри Поттер и философский камень',
    'Гарри Поттер и Тайная комната',
  ];

  for (let i = 0; i < authors.length; i++) {
    const booksForAuthor = randomFromArray(bookTitles, 3); // по 3 книги на автора
    await prisma.author.create({
      data: {
        name: authors[i].name,
        description: authors[i].description,
        yearsOfLife: authors[i].yearsOfLife,
        books: {
          create: booksForAuthor.map((title) => ({
            title,
            description: `Описание книги "${title}".`,
            price: randomInt(200, 1000),
            sale: Math.random() > 0.5 ? randomInt(5, 30) : null,
            categoryId: randomInt(1, 5),
            subcategoryId: randomInt(1, 18),
            tags: {
              connect: randomFromArray([{ id: 1 }, { id: 2 }, { id: 3 }], randomInt(1, 3)),
            },
            images: {
              create: [
                {
                  url: `https://picsum.photos/seed/${encodeURIComponent(title)}-1/400/600`,
                  order: 0,
                },
                {
                  url: `https://picsum.photos/seed/${encodeURIComponent(title)}-2/400/600`,
                  order: 1,
                },
                {
                  url: `https://picsum.photos/seed/${encodeURIComponent(title)}-3/400/600`,
                  order: 2,
                },
              ],
            },
            specs: {
              create: [
                { name: 'Издательство', value: 'АСТ' },
                { name: 'Серия', value: 'Классическая проза' },
                { name: 'Год издания', value: String(randomInt(1950, 2023)) },
                { name: 'Количество страниц', value: String(randomInt(200, 900)) },
                { name: 'Переплет', value: 'Твердый' },
                { name: 'Формат', value: '84x108/32' },
                { name: 'ISBN', value: `978-5-${randomInt(1000000, 9999999)}` },
                { name: 'Вес', value: `${randomInt(200, 800)} г` },
              ],
            },
          })),
        },
      },
    });
  }
}

async function clearData() {
  //await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  //await prisma.$executeRaw`TRUNCATE TABLE "Session" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "SubCategory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Tag" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Book" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Author" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "BookImage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "BookSpec" RESTART IDENTITY CASCADE`;

  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`;
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
