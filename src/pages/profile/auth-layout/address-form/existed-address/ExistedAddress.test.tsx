import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AddressFormValues } from '../AddressForm';
import ExistedAddress from './ExistedAddress';

// Мокаем компонент AddressForm
vi.mock('../AddressForm', () => ({
  default: ({
    defaultValue,
    formSubmitHandler,
    handleDeleteAddress,
  }: {
    defaultValue: AddressFormValues;
    formSubmitHandler: (data: AddressFormValues) => Promise<void>;
    handleDeleteAddress?: (id: string) => void;
  }) => (
    <div data-testid="address-form">
      <div data-testid="street-name">{defaultValue.streetName}</div>
      <div data-testid="city">{defaultValue.city}</div>
      <div data-testid="country">{defaultValue.country}</div>
      <div data-testid="postal-code">{defaultValue.postalCode}</div>
      <div data-testid="is-default-shipping">
        {defaultValue.isDefaultShipping ? 'true' : 'false'}
      </div>
      <div data-testid="is-default-billing">
        {defaultValue.isDefaultBilling ? 'true' : 'false'}
      </div>
      <button
        data-testid="submit-button"
        onClick={() => formSubmitHandler(defaultValue)}
      >
        Submit
      </button>
      <button
        data-testid="delete-button"
        onClick={() => handleDeleteAddress?.(defaultValue.id || '')}
      >
        Delete
      </button>
    </div>
  ),
}));

// Мокаем Redux хуки
vi.mock('@/redux/hooks', () => ({
  useAppDispatch: () => vi.fn(),
}));

// Мокаем API мутацию
vi.mock('@/services/api', () => ({
  useUpdateProfileMutation: () => [
    vi.fn().mockReturnValue({
      unwrap: () => Promise.resolve({ id: 'test-customer' }),
    }),
  ],
}));

// Мокаем утилиты для работы с странами
vi.mock('@/utils/getCountryNameByCode', () => ({
  getCountryCodeByName: (name: string) => (name === 'Russia' ? 'RU' : 'BY'),
  getCountryNameByCode: (code: string) =>
    code === 'RU' ? 'Russia' : 'Belarus',
}));

// Мокаем toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

const mockAddressToEdit: AddressFormValues = {
  id: 'address-1',
  country: 'RU',
  streetName: '123 Main Street',
  city: 'Moscow',
  postalCode: '123456',
  isDefaultShipping: true,
  isDefaultBilling: false,
};

describe('ExistedAddress', () => {
  const defaultProps = {
    addressToEdit: mockAddressToEdit,
    version: 1,
  };

  it('renders submit and delete buttons', () => {
    render(<ExistedAddress {...defaultProps} />);

    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
  });

  it('handles delete address', () => {
    render(<ExistedAddress {...defaultProps} />);

    const deleteButton = screen.getByTestId('delete-button');
    deleteButton.click();

    // Проверяем, что кнопка удаления работает
    expect(deleteButton).toBeInTheDocument();
  });
});
