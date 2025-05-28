import { ICustomerDetails } from '../interfaces';

export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  customer: ICustomerDetails | null;
  isLoading: boolean;
  error: string | null;
}

export interface IAddress {
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
}

export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: IAddress[];
  defaultBillingAddress: number;
  defaultShippingAddress: number;
  billingAddresses: number[];
  shippingAddresses: number[];
}
