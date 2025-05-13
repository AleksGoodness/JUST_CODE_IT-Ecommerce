import * as yup from 'yup';

export const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character',
    )
    .required(),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')])
    .required(),
  email: yup.string().email().required(),
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
      country: yup.string().required(),
      city: yup.string().required(),
      address: yup.string().required(),
      postcode: yup.string().required(),
    })
    .required(),
  dateOfBirth: yup.date().required(),
});

export default schema;
