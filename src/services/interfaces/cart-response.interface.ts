export interface ICartResponse {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  anonymousId: string;
  lineItems: unknown[];
  cartState: string;
  totalPrice: TotalPrice;
  shippingMode: string;
  shipping: unknown[];
  customLineItems: unknown[];
  discountCodes: unknown[];
  directDiscounts: unknown[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: unknown[];
  origin: string;
  itemShippingAddresses: unknown[];
  discountTypeCombination: DiscountTypeCombination;
}

export interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface TotalPrice {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface DiscountTypeCombination {
  type: string;
}
