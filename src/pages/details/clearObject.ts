interface TempObject {
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
  user: UserReference;
}

interface UserReference {
  typeId: string;
  id: string;
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

interface Image {
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

interface Attribute {
  name: string;
  value: string | number | boolean | MoneyValue | MoneyValue[];
}

interface Price {
  value: MoneyValue;
}

interface ProductDetails {
  id: string;
  description: Record<string, string>;
  attributes: Attribute[];
  images: Image[];
}

const clearObject = (tempObject: TempObject): ProductDetails => {
  return {
    id: tempObject.id,
    description: tempObject.masterData.staged.description,
    attributes: tempObject.masterData.staged.masterVariant.attributes,
    images: tempObject.masterData.staged.masterVariant.images,
  };
};

export default clearObject;
