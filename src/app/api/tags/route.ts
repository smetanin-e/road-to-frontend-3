import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  const tags = await prisma.tag.findMany({
    include: {
      books: {
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
  return NextResponse.json(tags);
}
