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
  password_confirm?: string;
  dateOfBirth?: Date;
  shipping_address?: {
    country: string;
    city: string;
    address: string;
    postcode: string;
  };
  billing_address?: {
    country: string;
    city: string;
    address: string;
    postcode: string;
  };
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
): value is RegisterInputProps['shipping_address'] => {
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
