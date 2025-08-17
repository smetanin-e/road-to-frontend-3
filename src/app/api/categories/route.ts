import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { subcategories: { include: { _count: { select: { books: true } } } }, books: true },
  });

  return NextResponse.json(categories);
}
