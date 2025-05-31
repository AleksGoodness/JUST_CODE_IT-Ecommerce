export interface ICustomerDetails {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Address[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  customerGroupAssignments: unknown[];
  stores: unknown[];
  authenticationMode: string;
}

export interface CustomerUpdateData {
  version: number;
  actions: {
    action: string;
    address?: Address;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
  }[];
}

export interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface Timestamps {
  createdAt: string;
  lastModifiedAt: string;
  versionModifiedAt: string;
}

interface VersionInfo {
  version: number;
  lastMessageSequenceNumber: number;
}

interface SystemInfo {
  id: string;
  key: string;
  timestamps: Timestamps;
  versionInfo: VersionInfo;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: 'user';
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: 'user';
      id: string;
    };
  };
}

interface LocalizedField {
  'en-US': string;
  // Можно добавить другие языки при необходимости
  // [locale: string]: string;
}

interface CategoryContent {
  name: LocalizedField;
  slug: LocalizedField;
  description: LocalizedField;
  metaTitle: LocalizedField;
  metaDescription: LocalizedField;
  orderHint: string;
}

interface Category extends SystemInfo, CategoryContent {
  ancestors: unknown[]; // Уточнить тип при необходимости
  assets: unknown[]; // Уточнить тип при необходимости
}

interface PagedResponse<T> {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: T[];
}

export type CategoryPagedResponse = PagedResponse<Category>;
