import { Attribute, Image } from '../details/clearObject';

export interface Cart {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: ClientInfo;
  createdBy: ClientInfo;
  customerId?: string;
  anonymousId?: string;
  lineItems: LineItem[];
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
  state: 'MatchesCart' | 'NotApplicable' | 'Applied';
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

interface Variant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: unknown[];
}

interface Price {
  id: string;
  value: MoneyValue;
  key?: string;
  discounted?: {
    value: MoneyValue;
    discount: {
      typeId: string;
      id: string;
    };
  };
}

type ProductName = Record<string, string>;

interface ProductType {
  typeId: string;
  id: string;
  version: number;
}

export interface LineItem {
  id: string;
  productId: string;
  productKey: string;
  name: ProductName;
  productType: ProductType;
  productSlug: ProductName;
  variant: Variant;
  price: Price;
  quantity: number;
  discountedPricePerQuantity: DiscountItem[];
  perMethodTaxRate: TaxRate[];
  addedAt: string;
  lastModifiedAt: string;
  state: State[];
  priceMode: 'Platform';
  lineItemMode: 'Standard';
  totalPrice: MoneyValue;
  taxedPricePortions: TaxRate[];
}

export interface LineItemModified {
  id: string;
  productId: string;
  productKey: string;
  name: string;
  price: number;
  discount: number | undefined;
  image: string;
  quantity: number;
  totalPrice: number;
}

interface State {
  quantity: number;
  state: {
    typeId: string;
    id: string;
  };
}

export interface CartDetails {
  id: string;
  version: number;
  customerId?: string;
  anonymousId?: string;
  products: LineItemModified[];
  finalPrice: MoneyValue;
  totalQuantity: number;
  totalPriceWithDiscount: number;
}

const clearLineItem = (clearCartObject: Cart): LineItemModified[] => {
  return clearCartObject.lineItems.map(product => ({
    id: product.productId,
    productId: product.productId,
    productKey: product.productKey,
    name: product.name['en-US'],
    price: product.variant.prices[0].value.centAmount,
    discount: product.variant.prices[0].discounted?.value.centAmount,
    image: product.variant.images[0].url,
    quantity: product.quantity,
    totalPrice: product.totalPrice.centAmount,
  }));
};

const clearCartObject = (cart: Cart): CartDetails => {
  let totalDiscount = 0;
  if (cart.discountOnTotalPrice?.discountedAmount.centAmount) {
    totalDiscount = cart.discountOnTotalPrice.discountedAmount.centAmount;
  }
  return {
    id: cart.id,
    version: cart.version,
    customerId: cart.customerId,
    anonymousId: cart.anonymousId,
    products: clearLineItem(cart),
    finalPrice: cart.totalPrice,
    totalQuantity: cart.totalLineItemQuantity,
    totalPriceWithDiscount: cart.totalPrice.centAmount - totalDiscount,
  };
};

export default clearCartObject;
