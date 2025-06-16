export interface IUpdateCart {
  version: number;
  actions: Action[];
}

interface Action {
  action: string;
  productId?: string;
  lineItemId?: string;
  variantId?: number;
  quantity: number;
}

export enum ECartUpdateActions {
  addNewProduct = 'addLineItem',
  removeProduct = 'removeLineItem',
  addDiscountCode = 'addDiscountCode',
}

export enum ELocalStorage {
  anonymousCartId = 'anonymousCartId',
  anonymousId = 'anonymousId',
}
