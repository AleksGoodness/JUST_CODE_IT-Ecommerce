import * as yup from 'yup';

import { domainRegex, noSpacesRegex } from '../register/interfaces';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(domainRegex, 'Invalid email format or missing domain name')
    .email('Invalid email format')
    .matches(noSpacesRegex, 'No spaces allowed')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])/, 'at least one lowercase')
    .matches(/^(?=.*[A-Z])/, 'at least one uppercase')
    .matches(/^(?=.*[0-9])/, 'at least one number')
    .matches(/^(?=.*[!@#$%^&*])/, 'at least one symbol')
    .matches(noSpacesRegex, 'No spaces allowed')
    .min(8, 'min length - 8')
    .required('Password is required'),
});

export default schema;
