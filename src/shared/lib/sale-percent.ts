export const salePercent = (oldPrice: number | null, price: number) => {
  return oldPrice !== null && oldPrice > price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;
};
