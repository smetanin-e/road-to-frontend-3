export const beforeSalePrice = (price: number, sale: number) => {
  return Math.ceil(price / (1 - sale / 100));
};
