export function formatPrice(currency: string, price: number): string {
  let formatedPrice = '';
  if (currency === 'BYN') {
    formatedPrice = (price / 100).toFixed(2) + ' BYN';
    return formatedPrice;
  }
  if (currency === 'RUB') {
    formatedPrice = ((price / 100) * 80).toFixed(2) + ' ₽';
    return formatedPrice;
  }
  return '';
}
