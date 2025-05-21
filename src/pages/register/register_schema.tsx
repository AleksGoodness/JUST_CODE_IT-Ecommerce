import * as yup from 'yup';

import {
  domainRegex,
  noSpacesRegex,
  onlyLettersRegex,
  postalCodeRegex,
} from './interfaces';

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(onlyLettersRegex, 'First name must contain only letters')
    .required('First name is required'),
  lastName: yup
    .string()
    .matches(onlyLettersRegex, 'Last name must contain only letters')
    .required('Last name is required'),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])/, 'at least one lowercase')
    .matches(/^(?=.*[A-Z])/, 'at least one uppercase')
    .matches(/^(?=.*[0-9])/, 'at least one number')
    .matches(/^(?=.*[!@#$%^&*])/, 'at least one symbol')
    .matches(noSpacesRegex, 'No spaces allowed')
    .min(8, 'min length - 8')
    .required('Password is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  email: yup
    .string()
    .matches(domainRegex, 'Invalid email format or missing domain name')
    .email('Invalid email format')
    .required('Email is required'),
  dateOfBirth: yup
    .date()
    .required('Date of Birth is required')
    .typeError('Invalid date format')
    .test('is-old-enough', 'You must be at least 14 years old', value => {
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 14,
        today.getMonth(),
        today.getDate(),
      );
      return value <= minDate;
    }),
  billingAddress: yup.object().shape({
    country: yup.string().required('Country is required'),
    streetName: yup
      .string()
      .matches(onlyLettersRegex, 'Street name must contain only letters')
      .required('Street is required'),
    city: yup
      .string()
      .matches(onlyLettersRegex, 'City name must contain only letters')
      .required('City is required'),
    postalCode: yup
      .string()
      .matches(postalCodeRegex, 'Wrong format, required 6 numbers')
      .required('Postal code is required'),
  }),
  shippingAddress: yup.object().shape({
    country: yup.string().required('Country is required'),
    streetName: yup
      .string()
      .matches(onlyLettersRegex, 'Street name must contain only letters')
      .required('Street is required'),
    city: yup
      .string()
      .matches(onlyLettersRegex, 'City name must contain only letters')
      .required('City is required'),
    postalCode: yup
      .string()
      .matches(postalCodeRegex, 'Wrong formart, required 6 numbers')
      .required('Postal code is required'),
  }),
  defaultBillingAddress: yup.number().required(),
  defaultShippingAddress: yup.number().required(),
  billingAddresses: yup.array().of(yup.number().required()).required(),
  shippingAddresses: yup.array().of(yup.number().required()).required(),
});

export default schema;
