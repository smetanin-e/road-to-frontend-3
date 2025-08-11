import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { subcategories: true },
  });

  return NextResponse.json(categories);
}
