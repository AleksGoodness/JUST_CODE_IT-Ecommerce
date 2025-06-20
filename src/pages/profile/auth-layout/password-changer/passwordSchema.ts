import * as yup from 'yup';

import { noSpacesRegex } from '../../../login-register/register/interfaces';

const passwordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Old password is required')
    .min(8, 'Minimum length is 8 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Minimum length is 8 characters')
    .matches(noSpacesRegex, 'No spaces allowed')
    .matches(/^(?=.*[a-z])/, 'At least one lowercase letter')
    .matches(/^(?=.*[A-Z])/, 'At least one uppercase letter')
    .matches(/^(?=.*[0-9])/, 'At least one number')
    .matches(/^(?=.*[!@#$%^&*])/, 'At least one special character (!@#$%^&*)')
    .notOneOf(
      [yup.ref('oldPassword')],
      'New password must differ from old one',
    ),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default passwordSchema;
