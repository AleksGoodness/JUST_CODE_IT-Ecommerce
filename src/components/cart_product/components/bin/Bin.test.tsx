import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import { store } from '@/redux/store';

import Bin from './Bin';
import useDeleteCartItem from './useDeleteCartItem';

vi.mock('./useDeleteCartItem', () => ({
  default: vi.fn(() => vi.fn()),
}));

const renderWithProvider = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Bin Component', () => {
  it('renders delete icon button', () => {
    renderWithProvider(<Bin lineItemId="test-id" />);
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithProvider(<Bin lineItemId="test-id" />);
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toHaveAttribute('aria-label');
  });

  it('calls delete function when clicked', () => {
    const mockDeleteFn = vi.fn();
    vi.mocked(useDeleteCartItem).mockReturnValue(mockDeleteFn);

    renderWithProvider(<Bin lineItemId="test-id" />);
    const deleteButton = screen.getByRole('button');

    fireEvent.click(deleteButton);
    expect(mockDeleteFn).toHaveBeenCalledWith('test-id');
  });

  it('calls delete function with correct lineItemId', () => {
    const mockDeleteFn = vi.fn();
    vi.mocked(useDeleteCartItem).mockReturnValue(mockDeleteFn);

    renderWithProvider(<Bin lineItemId="cart-item-123" />);
    const deleteButton = screen.getByRole('button');

    fireEvent.click(deleteButton);
    expect(mockDeleteFn).toHaveBeenCalledWith('cart-item-123');
  });

  it('renders with correct styling', () => {
    renderWithProvider(<Bin lineItemId="test-id" />);
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toHaveStyle({ padding: '0px' });
  });

  it('contains delete icon', () => {
    renderWithProvider(<Bin lineItemId="test-id" />);
    const deleteIcon = screen.getByTestId('DeleteIcon');
    expect(deleteIcon).toBeInTheDocument();
  });

  it('handles multiple clicks correctly', () => {
    const mockDeleteFn = vi.fn();
    vi.mocked(useDeleteCartItem).mockReturnValue(mockDeleteFn);

    renderWithProvider(<Bin lineItemId="test-id" />);
    const deleteButton = screen.getByRole('button');

    fireEvent.click(deleteButton);
    fireEvent.click(deleteButton);

    expect(mockDeleteFn).toHaveBeenCalledTimes(2);
    expect(mockDeleteFn).toHaveBeenNthCalledWith(1, 'test-id');
    expect(mockDeleteFn).toHaveBeenNthCalledWith(2, 'test-id');
  });
});
