export interface IProductsResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: IProduct[];
}

export interface IProduct {
  id: string;
  version: number;
  productType: ProductType;
  name: Name;
  description: Description;
  categories: Category[];
  categoryOrderHints: unknown;
  slug: Slug;
  metaTitle: MetaTitle;
  metaDescription: MetaDescription;
  masterVariant: MasterVariant;
  variants: unknown[];
  searchKeywords: unknown;
  attributes: unknown[];
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  taxCategory: TaxCategory;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface ICLearProduct {
  id: string;
  description: string;
  name: string;
  price: number;
  currency: string;
  images: {
    url: string;
    label: string;
  }[];
  discount?: number;
}

interface MasterVariant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: unknown[];
}

interface Price {
  value: Value;
  discounted?: {
    value: Value;
  };
}

interface Value {
  centAmount: number;
  currencyCode: string;
}

interface ProductType {
  typeId: string;
  id: string;
}

interface Name {
  'en-US': string;
}

interface Description {
  'en-US': string;
}

interface Category {
  typeId: string;
  id: string;
}

interface Slug {
  'en-US': string;
}

interface MetaTitle {
  'en-US': string;
}

interface MetaDescription {
  'en-US': string;
}

interface Image {
  url: string;
  label?: string;
  dimensions: Dimensions;
}

interface Dimensions {
  w: number;
  h: number;
}

interface Attribute {
  name: string;
  value: Value[];
}

interface TaxCategory {
  typeId: string;
  id: string;
}
