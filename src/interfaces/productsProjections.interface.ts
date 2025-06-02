export interface IProductsProjections {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Result[];
}

interface Result {
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

interface MasterVariant {
  id: number;
  sku?: string;
  key?: string;
  prices: unknown[];
  images: Image[];
  attributes: Attribute[];
  assets: unknown[];
}
interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
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
