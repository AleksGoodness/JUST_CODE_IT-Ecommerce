import * as yup from 'yup';

export const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])/, 'at least one lowercase')
    .matches(/^(?=.*[A-Z])/, 'at least one uppercase')
    .matches(/^(?=.*[0-9])/, 'at least one number')
    .matches(/^(?=.*[!@#$%^&*])/, 'at least one symbol')
    .min(8, 'min length - 8')
    .required('Password is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  dateOfBirth: yup
    .date()
    .required('Date of Birth is required')
    .typeError('Invalid date format'),
  billingAddress: yup.object().shape({
    country: yup.string().required('Country is required'),
    streetName: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('Postcode is required'),
  }),
  shippingAddress: yup.object().shape({
    country: yup.string().required('Country is required'),
    streetName: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('Postcode is required'),
  }),
  defaultBillingAddress: yup.number().required(),
  defaultShippingAddress: yup.number().required(),
  billingAddresses: yup.array().of(yup.number().required()).required(),
  shippingAddresses: yup.array().of(yup.number().required()).required(),
});

export default schema;
