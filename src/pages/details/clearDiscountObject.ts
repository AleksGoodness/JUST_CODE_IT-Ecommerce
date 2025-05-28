interface UserReference {
  typeId: string;
  id: string;
}

interface LastModifiedBy {
  isPlatformClient: boolean;
  user: UserReference;
}

interface CreatedBy {
  isPlatformClient: boolean;
  user: UserReference;
}

interface DiscountValue {
  type: string;
  permyriad: number;
}

type DiscountName = Record<string, string>;

interface Reference {
  typeId: string;
  id: string;
}

interface DiscountData {
  id: string;
  version: number;
  versionModifiedAt: string;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  value: DiscountValue;
  predicate: string;
  name: DiscountName;
  isActive: boolean;
  sortOrder: string;
  references: Reference[];
  key: string;
}

interface Discount {
  id: string;
  value: number;
  names: string[] | undefined;
  isActive: boolean;
}

const clearDiscountObject = (discountObject: DiscountData): Discount => {
  const predicate = discountObject.predicate;
  const skuArray = predicate
    .match(/"([^"]+)"/g)
    ?.map(sku => sku.replace(/"/g, ''));
  return {
    id: discountObject.id,
    value: discountObject.value.permyriad,
    names: skuArray,
    isActive: discountObject.isActive,
  };
};

export default clearDiscountObject;
