export interface ProductsResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductsResult[];
}

export interface ProductsResult {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  productType: ProductType;
  masterData: MasterData;
  key: string;
  taxCategory: TaxCategory;
  priceMode: string;
  lastVariantId: number;
}

interface MasterVariant {
  id: number;
  sku: string;
  key: string;
  prices: unknown[];
  images: Image[];
  attributes: Attribute[];
  assets: unknown[];
}
interface LastModifiedBy {
  isPlatformClient: boolean;
  user?: User;
}

interface User {
  typeId: string;
  id: string;
}

interface CreatedBy {
  isPlatformClient: boolean;
  user: User2;
}

interface User2 {
  typeId: string;
  id: string;
}

interface ProductType {
  typeId: string;
  id: string;
}

export interface MasterData {
  current: Current;
  staged: Staged;
  published: boolean;
  hasStagedChanges: boolean;
}

interface Current {
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
  value: unknown;
}

interface Staged {
  name: Name2;
  description: Description2;
  categories: Category2[];
  categoryOrderHints: unknown;
  slug: Slug2;
  metaTitle: MetaTitle2;
  metaDescription: MetaDescription2;
  masterVariant: MasterVariant2;
  variants: [];
  searchKeywords: unknown;
  attributes: [];
}

interface Name2 {
  'en-US': string;
}

interface Description2 {
  'en-US': string;
}

interface Category2 {
  typeId: string;
  id: string;
}

interface Slug2 {
  'en-US': string;
}

interface MetaTitle2 {
  'en-US': string;
}

interface MetaDescription2 {
  'en-US': string;
}

interface MasterVariant2 {
  id: number;
  sku: string;
  key: string;
  prices: [];
  images: Image2[];
  attributes: Attribute2[];
  assets: [];
}

interface Image2 {
  url: string;
  dimensions: Dimensions2;
  label?: string;
}

interface Dimensions2 {
  w: number;
  h: number;
}

interface Attribute2 {
  name: string;
  value: unknown;
}

interface TaxCategory {
  typeId: string;
  id: string;
}
