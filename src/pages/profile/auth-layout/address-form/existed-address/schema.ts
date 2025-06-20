import * as yup from 'yup';

import baseSchema from '../baseSchema';

const existingAddressSchema = baseSchema.concat(
  yup.object().shape({
    id: yup.string().required(),
  }),
);

export default existingAddressSchema;
