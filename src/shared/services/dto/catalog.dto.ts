import { Category, SubCategory } from '@prisma/client';

export type CatalogDTO = Category & { subcategories?: SubCategory[] }; //!добавить книги & {books?: Book[]}
