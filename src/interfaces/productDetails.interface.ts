export interface IProductResponse {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: UserAction;
  createdBy: UserAction;
  productType: Reference;
  masterData: MasterData;
  key: string;
  taxCategory: Reference;
  priceMode: string;
  lastVariantId: number;
}

interface UserAction {
  isPlatformClient: boolean;
}

interface Reference {
  typeId: string;
  id: string;
}

interface MasterData {
  current: ProductData;
  staged: ProductData;
  published: boolean;
  hasStagedChanges: boolean;
}

interface ProductData {
  name: Record<string, string>;
  description: Record<string, string>;
  categories: Reference[];
  slug: Record<string, string>;
  metaTitle: Record<string, string>;
  metaDescription: Record<string, string>;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  searchKeywords: Record<string, unknown>;
  attributes: Attribute[];
}

interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: string[];
}

export interface Image {
  url: string;
  label?: string;
  dimensions: { w: number; h: number };
}

interface MoneyValue {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Attribute {
  name: string;
  value: string | number | MoneyValue | MoneyValue[];
}

interface Price {
  id: string;
  value: MoneyValue;
  key: string;
  discounted?: {
    value: MoneyValue;
    discount: Reference;
  };
}

export interface ProductDetails {
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
}
