import * as yup from 'yup';

import {
  onlyLettersRegex,
  postalCodeRegex,
} from '../../../register/interfaces';

const schema = yup.object().shape({
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
  isDefaultShipping: yup.boolean().required(),
  isDefaultBilling: yup.boolean().required(),
  id: yup.string().required(),
});

export default schema;
