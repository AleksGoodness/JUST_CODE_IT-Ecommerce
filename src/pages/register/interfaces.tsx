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
  addresses: [
    {
      country: string;
      streetName: string;
      city: string;
      postalCode: string;
    },
    {
      country: string;
      streetName: string;
      city: string;
      postalCode: string;
    },
  ];
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

export const isValidShippingAddress = (
  value: unknown,
): value is RegisterInputProps['addresses'] => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'country' in value &&
    'city' in value &&
    'address' in value &&
    'postcode' in value
  );
};

export interface FormInputProps extends Partial<RegisterInputProps> {
  name: string;
  label: string;
  options?: string[];
  type?: string;
}

export const passwordErrors = [
  { test: /[a-z]/, message: 'at least one lowercase' },
  { test: /[A-Z]/, message: 'at least one uppercase' },
  { test: /[0-9]/, message: 'at least one number' },
  { test: /[!@#$%^&*]/, message: 'at least one symbol' },
  { test: /.{8,}/, message: 'min length - 8' },
];
