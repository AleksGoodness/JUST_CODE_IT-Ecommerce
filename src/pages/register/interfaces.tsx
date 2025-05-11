export interface ShippingAddress {
  country: string;
  city: string;
  address: string;
  postcode: string;
}

export interface BillingAddress {
  country?: string;
  city?: string;
  address?: string;
  postcode?: string;
}

export interface IFormInputs {
  firstName: string;
  lastName: string;
  password: string;
  password_confirm: string;
  shipping_address: ShippingAddress;
  billing_address: BillingAddress;
  email: string;
  dateOfBirth: Date;
}
