export function findDiscount(price: number, discount: number): number {
  const discountValue = price * (discount / 10000);
  const countedDiscount = price - discountValue;
  return countedDiscount;
}
