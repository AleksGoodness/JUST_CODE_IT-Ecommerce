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

export const countries: string[] = [
  'Argentina',
  'Armenia',
  'Australia',
  'Azerbaijan',
  'Belarus',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Cuba',
  'Egypt',
  'France',
  'Germany',
  'Greece',
  'India',
  'Indonesia',
  'Israel',
  'Italy',
  'Japan',
  'Kazakhstan',
  'Kenya',
  'Kyrgyzstan',
  'Malaysia',
  'Mexico',
  'Moldova',
  'Morocco',
  'Netherlands',
  'New Zealand',
  'Peru',
  'Philippines',
  'Portugal',
  'Russia',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Switzerland',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Turkey',
  'Turkmenistan',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uzbekistan',
  'Vietnam',
];

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
