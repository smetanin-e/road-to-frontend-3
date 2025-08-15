export type BookDTO = {
  id: number;
  title: string;
  price: number;
  sale: number | null;
  images: {
    url: string;
  }[];
  author: {
    name: string;
  };
};

export type TagDTO = {
  id: number;
  name: string;
  slug: string;
  books: BookDTO[];
};

export interface ProductsBySlugDTO {
  name: string;
  type: 'tag' | 'category' | 'subcategory';
  data: BookDTO[];
}
