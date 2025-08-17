import { prisma } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('query');
    if (query) {
      const products = await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            {
              author: {
                name: { contains: query, mode: 'insensitive' },
              },
            },
          ],
        },
        include: {
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
      });
      return NextResponse.json(products);
    }
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({});
}
