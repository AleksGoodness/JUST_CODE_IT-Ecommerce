import * as yup from 'yup';

export const postalCodeRegex = /^\d{6}$/;
export const domainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const noSpacesRegex = /^\S*$/;
export const onlyLettersRegex = /^[A-Za-zА-Яа-яЁё]+$/;

export const validatingSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(onlyLettersRegex, 'First name must contain only letters')
    .min(2, 'First name cant be less than 2 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .matches(onlyLettersRegex, 'Last name must contain only letters')
    .min(3, 'Last name cant be less than 3 characters')
    .required('Last name is required'),
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
});

export default validatingSchema;
