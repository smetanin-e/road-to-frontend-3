import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const skip = Number(url.searchParams.get('skip') || 0);
  const take = Number(url.searchParams.get('take') || 5);

  const bookCards = await prisma.tag.findMany({
    include: {
      books: {
        skip,
        take,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          title: true,
          price: true,
          oldPrice: true,
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
  return NextResponse.json(bookCards);
}
