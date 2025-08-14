import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  const tags = await prisma.tag.findMany();
  return NextResponse.json(tags);
}
