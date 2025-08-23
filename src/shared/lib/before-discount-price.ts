export const beforeDiscountPrice = (price: number, sale: number) => {
  return Math.ceil(price / (1 - sale / 100));
};
