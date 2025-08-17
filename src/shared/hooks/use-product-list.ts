import React from 'react';
import { BookDTO } from '../services/dto/products.dto';
import { Api } from '../services';

export const useProductList = (slug: string, take = 8) => {
  const [books, setBooks] = React.useState<BookDTO[]>([]);
  const [skip, setSkip] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const didLoad = React.useRef(false);
  React.useEffect(() => {
    setBooks([]);
    setSkip(0);
    setHasMore(true);

    if (!didLoad.current) {
      loadBooks(0);
      didLoad.current = true;
    }
  }, [slug]);

  const loadBooks = async (customSkip?: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    const currentSkip = customSkip ?? skip;
    try {
      const { data } = await Api.products.getProductsBySlug(slug, { skip: currentSkip, take });
      setBooks((prev) => [...prev, ...data]);
      setSkip(currentSkip + take);

      if (data.length < take) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('LOAD_BOOKS', error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, books, loadBooks, hasMore };
};
