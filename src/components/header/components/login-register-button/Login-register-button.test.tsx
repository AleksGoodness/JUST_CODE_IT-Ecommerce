import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { lightTheme } from '@/theme/theme';

import LoginRegisterButton from './Login-register-button';

const mockDispatch = vi.fn();
const mockSetIsOpen = vi.fn();

// Mock the store
const mockStore = {
  getState: () => ({}),
  dispatch: mockDispatch,
  subscribe: vi.fn(),
  replaceReducer: vi.fn(),
  [Symbol.observable]: vi.fn(),
};

vi.mock('@/redux/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ customer: null }),
}));

vi.mock('@/redux/slices/authSlice', () => ({
  logOut: vi.fn(),
}));

vi.mock('@/services/api', () => ({
  ecommerceApi: {
    util: {
      invalidateTags: vi.fn(),
    },
  },
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('LoginRegisterButton Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSetIsOpen.mockClear();
    vi.clearAllMocks();
  });

  it('renders login button when user is not authenticated', () => {
    renderWithProviders(<LoginRegisterButton />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/login');
  });

  it('calls setIsOpen with false when button is clicked', () => {
    renderWithProviders(<LoginRegisterButton setIsOpen={mockSetIsOpen} />);

    const button = screen.getByRole('link');
    fireEvent.click(button);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('does not call setIsOpen when setIsOpen prop is not provided', () => {
    renderWithProviders(<LoginRegisterButton />);

    const button = screen.getByRole('link');
    fireEvent.click(button);

    expect(mockSetIsOpen).not.toHaveBeenCalled();
  });

  it('renders with correct variant and component props', () => {
    renderWithProviders(<LoginRegisterButton />);

    const button = screen.getByRole('link');
    expect(button).toHaveClass('MuiButton-contained');
    expect(button).toHaveAttribute('href', '/login');
  });
});
