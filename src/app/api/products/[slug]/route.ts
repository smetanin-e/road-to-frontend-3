import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const url = new URL(req.url);
  const skip = Number(url.searchParams.get('skip') || 0);
  const take = Number(url.searchParams.get('take') || 5);

  // Проверяем в Tag
  const tag = await prisma.tag.findUnique({
    where: { slug },
    select: {
      name: true,
      books: {
        skip,
        take,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          title: true,
          price: true,
          sale: true,
          images: {
            where: { order: 0 },
            select: { url: true },
          },
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (tag) {
    return NextResponse.json({ type: 'tag', name: tag.name, data: tag.books });
  }

  // Проверяем в Category
  const category = await prisma.category.findUnique({
    where: { slug },
    select: {
      name: true,
      books: {
        skip,
        take,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          title: true,
          price: true,
          sale: true,
          images: {
            where: { order: 0 },
            select: { url: true },
          },
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (category) {
    return NextResponse.json({ type: 'category', name: category.name, data: category.books });
  }

  // Проверяем в Subategory
  const subCategory = await prisma.subCategory.findUnique({
    where: { slug },
    select: {
      name: true,
      books: {
        skip,
        take,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          title: true,
          price: true,
          sale: true,
          images: {
            where: { order: 0 },
            select: { url: true },
          },
          author: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (subCategory) {
    return NextResponse.json({
      type: 'subCategory',
      name: subCategory.name,
      data: subCategory.books,
    });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
