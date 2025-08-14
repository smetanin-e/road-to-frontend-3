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
  books: BookDTO[];
};
