import { Attribute, Image } from '../details/clearObject';

export interface Cart {
  type: 'Cart';
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: ClientInfo;
  createdBy: ClientInfo;
  customerId?: string;
  lineItems: CartSummary[];
  cartState: 'Active';
  totalPrice: MoneyValue;
  discountOnTotalPrice?: DiscountOnTotalPrice;
  shippingMode: 'Single';
  shipping: ShippingInfo[];
  customLineItems: CustomLineItem[];
  discountCodes: DiscountCode[];
  directDiscounts: Discount[];
  inventoryMode: 'None';
  taxMode: 'Platform';
  taxRoundingMode: 'HalfEven';
  taxCalculationMode: 'LineItemLevel';
  deleteDaysAfterLastModification: number;
  refusedGifts: RefusedGift[];
  origin: 'Customer';
  itemShippingAddresses: ShippingAddress[];
  discountTypeCombination: DiscountTypeCombination;
  totalLineItemQuantity: number;
}

interface RefusedGift {
  id: string;
  name: Record<string, string>;
}

interface ClientInfo {
  clientId: string;
  isPlatformClient: boolean;
}

interface ShippingInfo {
  shippingMethod: Reference;
  shippingRate: ShippingRate;
  taxRate?: TaxRate;
  shippingAddress: ShippingAddress;
}

interface ShippingRate {
  price: MoneyValue;
  freeAbove?: MoneyValue;
}

interface TaxRate {
  name: string;
  amount: number;
  includedInPrice: boolean;
}

interface ShippingAddress {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
}

interface CustomLineItem {
  id: string;
  name: Record<string, string>;
  price: MoneyValue;
}

interface DiscountCode {
  discountCode: Reference;
  state: 'MatchesCart' | string;
}

interface Discount {
  discountAmount: MoneyValue;
}

interface DiscountOnTotalPrice {
  discountedAmount: MoneyValue;
  includedDiscounts: DiscountItem[];
}

interface DiscountItem {
  discount: Reference;
  discountedAmount: MoneyValue;
}

interface DiscountTypeCombination {
  type: 'Stacking';
}

interface Reference {
  typeId: string;
  id: string;
}

interface MoneyValue {
  type: 'centPrecision';
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface CartSummary {
  id: string;
  name: string;
  description: Record<string, string>;
  attributes: Attribute[];
  images: Image[];
  price: string;
  discountPrice: string;
  cost: number;
  discount: number | undefined;
  sku: string;
  currency: string;
  quantity: number;
}

export interface CartDetails {
  id: string;
  version: number;
  customerID: string | undefined;
  products: CartSummary[];
  discountPrice: number;
}

const clearCartObject = (cart: Cart): CartDetails => {
  return {
    id: cart.id,
    version: cart.version,
    customerID: cart.customerId,
    products: cart.lineItems,
    discountPrice: cart.totalPrice.centAmount,
  };
};

export default clearCartObject;
