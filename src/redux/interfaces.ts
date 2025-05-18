export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  customer: ICustomer | null;
  isLoading: boolean;
  error: string | null;
}

export interface ICustomer {
  addresses: string[];
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: string;
  stores: string[];
}
export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: {
    country: string;
    streetName: string;
    city: string;
    postalCode: string;
  }[];
  defaultBillingAddress: number;
  defaultShippingAddress: number;
  billingAddresses: number[];
  shippingAddresses: number[];
}
