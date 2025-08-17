import { Book, Category, SubCategory } from '@prisma/client';

export type CatalogDTO = Category & {
  subcategories?: (SubCategory & { _count?: { books: number } })[];
  books?: Book[];
};
