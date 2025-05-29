export function formatPrice(currency: string, price: number): string {
  let formatedPrice = '';
  if (currency === 'BYN') {
    formatedPrice = (price / 100).toFixed(2) + ' Br';
    return formatedPrice;
  }
  if (currency === 'RUB') {
    formatedPrice = ((price / 100) * 80).toFixed(2) + ' ₽';
    return formatedPrice;
  }
  return '';
}

export function findDiscount(price: number, discount: number): number {
  const discountValue = price * (discount / 10000);
  const countedDiscount = price - discountValue;
  return countedDiscount;
}
