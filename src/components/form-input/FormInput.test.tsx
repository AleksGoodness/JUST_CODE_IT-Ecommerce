import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { Wrapper } from '../../__test__/test_utils';
import FormInput from './FormInput';

it('FormInput renders correctly', () => {
  render(
    <Wrapper>
      <FormInput label="First Name" name="firstName" />
      <FormInput label="Second Name" name="lastName" />
      <FormInput label="Password" name="password" />
      <FormInput label="Confirm password" name="password_confirm" />
      <FormInput label="Country" name="shippingAddress.country" />
      <FormInput label="Street" name="shippingAddress.streetName" />
      <FormInput label="City" name="shippingAddress.city" />
      <FormInput label="Postcode" name="shippingAddress.postalCode" />
    </Wrapper>,
  );

  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Second Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Confirm password/i)).toBeInTheDocument();
  const passwordInputs = screen.getAllByLabelText(/Password/i);
  const countryInputs = screen.getAllByText(/Country/i);
  const streetInputs = screen.getAllByText(/Street/i);
  const cityInputs = screen.getAllByText(/City/i);
  const postcodeInputs = screen.getAllByText(/Postcode/i);
  expect(passwordInputs.length).toBe(2);
  expect(passwordInputs[0]).toBeInTheDocument();
  expect(passwordInputs[1]).toBeInTheDocument();
  expect(countryInputs.length).toBe(2);
  expect(countryInputs[0]).toBeInTheDocument();
  expect(countryInputs[1]).toBeInTheDocument();
  expect(streetInputs.length).toBe(2);
  expect(streetInputs[0]).toBeInTheDocument();
  expect(streetInputs[1]).toBeInTheDocument();
  expect(cityInputs.length).toBe(2);
  expect(cityInputs[0]).toBeInTheDocument();
  expect(cityInputs[1]).toBeInTheDocument();
  expect(postcodeInputs.length).toBe(2);
  expect(postcodeInputs[0]).toBeInTheDocument();
  expect(postcodeInputs[1]).toBeInTheDocument();
});
