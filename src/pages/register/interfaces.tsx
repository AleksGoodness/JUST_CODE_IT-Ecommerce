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
  dateOfBirth: string;
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
  Armenia: 'AM',
  Azerbaijan: 'AZ',
  Belarus: 'BY',
  Kazakhstan: 'KZ',
  Kyrgyzstan: 'KG',
  Moldova: 'MD',
  Russia: 'RU',
  Tajikistan: 'TJ',
  Turkmenistan: 'TM',
  Ukraine: 'UA',
  Uzbekistan: 'UZ',
  France: 'FR',
  Germany: 'DE',
  Italy: 'IT',
  Spain: 'ES',
  Netherlands: 'NL',
  Switzerland: 'CH',
  'United Kingdom': 'GB',
  Portugal: 'PT',
  Greece: 'GR',
  Poland: 'PL',
};

export interface FormInputProps extends Partial<RegisterInputProps> {
  name: string;
  label: string;
  options?: string[];
  type?: string;
}
