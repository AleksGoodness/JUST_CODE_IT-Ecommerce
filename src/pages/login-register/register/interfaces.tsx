export interface FormFieldProps {
  name: string;
  label: string;
  options?: string[];
  type?: string;
}

export interface RegisterInputProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirm: string;
  dateOfBirth: Date;
  billingAddress: {
    country: string;
    streetName: string;
    city: string;
    postalCode: string;
  };
  shippingAddress: {
    country: string;
    streetName: string;
    city: string;
    postalCode: string;
  };
  defaultBillingAddress: number;
  defaultShippingAddress: number;
  billingAddresses: number[];
  shippingAddresses: number[];
}

export const countries: Record<string, string> = {
  Belarus: 'BY',
  Russia: 'RU',
};

export interface FormInputProps extends Partial<RegisterInputProps> {
  name: string;
  label: string;
  options?: string[];
  type?: string;
}

export const postalCodeRegex = /^\d{6}$/;
export const domainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const noSpacesRegex = /^\S*$/;
export const onlyLettersRegex = /^[A-Za-zА-Яа-яЁё]+$/;
