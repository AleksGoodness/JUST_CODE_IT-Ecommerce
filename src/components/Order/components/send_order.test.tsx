import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ecommerceApi } from '@/services/api';

import SendOrder from './send_order';

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    warning: vi.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockOnCartDeleted = vi.fn();

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(ecommerceApi.middleware),
    preloadedState: initialState,
  });
};

const renderWithProvider = (
  component: React.ReactElement,
  initialState = {},
) => {
  const store = createMockStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};

describe('SendOrder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.removeItem.mockClear();
  });

  it('renders the PLACE ORDER button', () => {
    renderWithProvider(<SendOrder onCartDeleted={mockOnCartDeleted} />);

    expect(
      screen.getByRole('button', { name: /place order/i }),
    ).toBeInTheDocument();
  });

  it('shows warning when cart is empty', async () => {
    renderWithProvider(<SendOrder onCartDeleted={mockOnCartDeleted} />);

    const button = screen.getByRole('button', { name: /place order/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith('Your cart is empty');
    });
  });
});
