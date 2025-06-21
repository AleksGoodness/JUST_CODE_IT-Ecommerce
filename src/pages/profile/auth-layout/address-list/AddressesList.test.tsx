import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Address } from '@/interfaces/customerDeteils.interface';

import AddressList from './AddressesList';

// Мокаем компонент ExistedAddress, так как он может иметь сложную логику
vi.mock('../address-form/existed-address/ExistedAddress', () => ({
  default: ({ addressToEdit }: { addressToEdit: { streetName: string } }) => (
    <div data-testid="existed-address">
      Edit address: {addressToEdit.streetName}
    </div>
  ),
}));

// Мокаем утилиту getCountryNameByCode
vi.mock('@/utils/getCountryNameByCode', () => ({
  getCountryNameByCode: (code: string) => `Country ${code}`,
}));

// Мокаем компонент Title
vi.mock('@/components/title/Title', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="title">{children}</h2>
  ),
}));

const mockAddresses: Address[] = [
  {
    id: 'address-1',
    streetName: '123 Main St',
    city: 'New York',
    country: 'US',
    postalCode: '10001',
  },
  {
    id: 'address-2',
    streetName: '456 Oak Ave',
    city: 'Los Angeles',
    country: 'US',
    postalCode: '90210',
  },
];

describe('AddressList', () => {
  const defaultProps = {
    addresses: mockAddresses,
    version: 1,
    isEditMode: false,
  };

  it('shows edit form when in edit mode', () => {
    render(<AddressList {...defaultProps} isEditMode={true} />);

    expect(screen.getAllByTestId('existed-address')).toHaveLength(2);
    expect(screen.getByText('Edit address: 123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Edit address: 456 Oak Ave')).toBeInTheDocument();
  });

  it('does not show edit form when not in edit mode', () => {
    render(<AddressList {...defaultProps} isEditMode={false} />);

    expect(screen.queryByTestId('existed-address')).not.toBeInTheDocument();
  });

  it('renders empty list when no addresses provided', () => {
    render(<AddressList {...defaultProps} addresses={[]} />);

    expect(screen.getByTestId('title')).toHaveTextContent('Addresses');
    expect(screen.queryByText('123 Main St')).not.toBeInTheDocument();
    expect(screen.queryByText('456 Oak Ave')).not.toBeInTheDocument();
  });
});
