import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character',
    ),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required'),
  shipping_address: yup
    .object()
    .shape({
      country: yup.string().required(),
      city: yup.string().required(),
      address: yup.string().required(),
      postcode: yup.string().required(),
    })
    .required(),
  billing_address: yup
    .object()
    .shape({
      country: yup.string().optional(),
      city: yup.string().optional(),
      address: yup.string().optional(),
      postcode: yup.string().optional(),
    })
    .required(),

  email: yup.string().email().required(),
  dateOfBirth: yup
    .date()
    .min(new Date(1900, 0, 1))
    .required(),
});

export default schema;
