import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])/, 'at least one lowercase')
    .matches(/^(?=.*[A-Z])/, 'at least one uppercase')
    .matches(/^(?=.*[0-9])/, 'at least one number')
    .matches(/^(?=.*[!@#$%^&*])/, 'at least one symbol')
    .min(8, 'min length - 8')
    .required('Password is required'),
});

export default schema;
