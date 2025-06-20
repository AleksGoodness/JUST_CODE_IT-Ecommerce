import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../../../redux/hooks';
import { setCustomer } from '../../../../../redux/slices/authSlice';
import { useUpdateProfileMutation } from '../../../../../services/api';
import {
  getCountryCodeByName,
  getCountryNameByCode,
} from '../../../../../utils/getCountryNameByCode';
import AddressForm, { AddressFormValues } from '../AddressForm';
import baseSchema from '../baseSchema';

interface Props {
  addressToEdit: AddressFormValues;
  version: number;
}

const ExistedAddress = ({ addressToEdit, version }: Props) => {
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();
  console.log(addressToEdit);
  const handleDeleteAddress = (id: string) => {
    if (!version) return;
    updateProfile({
      version: version,

      actions: [
        {
          action: 'removeAddress',
          addressId: `${id}`,
        },
      ],
    })
      .unwrap()
      .then(response => dispatch(setCustomer(response)));
    toast.success('address deleted');
  };

  const methods = useForm<AddressFormValues>({
    mode: 'onChange',
    resolver: yupResolver(baseSchema),
    defaultValues: {
      ...addressToEdit,
      country: getCountryNameByCode(addressToEdit.country),
    },
  });

  const formSubmitHandler = async (data: AddressFormValues) => {
    const formattedData: AddressFormValues = {
      ...data,
      country: getCountryCodeByName(data.country),
    };

    const isChanged =
      JSON.stringify(formattedData) !== JSON.stringify(addressToEdit);

    if (!isChanged) {
      toast.info('Nothing is changed');
      return;
    }

    const actions: {
      action: string;
      addressId: string;
      address?: {
        country: string;
        streetName: string;
        city: string;
        postalCode: string;
      };
    }[] = [];

    if (!formattedData.id) {
      toast.error('Address ID is missing');
      return;
    }

    actions.push({
      action: 'changeAddress',
      addressId: formattedData.id,
      address: {
        country: formattedData.country,
        streetName: formattedData.streetName,
        city: formattedData.city,
        postalCode: formattedData.postalCode,
      },
    });

    if (formattedData.isDefaultShipping !== addressToEdit.isDefaultShipping) {
      actions.push({
        action: formattedData.isDefaultShipping
          ? 'setDefaultShippingAddress'
          : 'removeShippingAddressId',
        addressId: formattedData.id,
      });
    }

    if (data.isDefaultBilling !== addressToEdit.isDefaultBilling) {
      actions.push({
        action: data.isDefaultBilling
          ? 'setDefaultBillingAddress'
          : 'removeBillingAddressId',
        addressId: formattedData.id,
      });
    }

    const request = await updateProfile({
      version: version,
      actions: actions,
    });
    if (request.data) {
      toast.success('address updated');
      dispatch(setCustomer(request.data));
    }
    if (request.error) {
      console.log(request.error);
      toast.error('something go wrong');
    }
  };

  return (
    <FormProvider {...methods}>
      <AddressForm
        defaultValue={addressToEdit}
        formSubmitHandler={formSubmitHandler}
        handleDeleteAddress={handleDeleteAddress}
      />
    </FormProvider>
  );
};

export default ExistedAddress;
