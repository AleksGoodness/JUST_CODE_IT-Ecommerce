export interface ICreateCartData {
  currency: 'BYN' | 'RUB';
  anonymousId?: string;
  customerId?: string;
  useAuthClient: boolean;
}

export enum ELocalStorage {
  anonymousCartId = 'anonymousCartId',
  anonymousId = 'anonymousId',
  ctpToken = 'ctpTokenCache',
}
