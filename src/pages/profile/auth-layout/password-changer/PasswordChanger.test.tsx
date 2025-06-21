import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import authSlice from '@/redux/slices/authSlice';
import themeSlice from '@/redux/slices/themeSlice';
import { lightTheme } from '@/theme/theme';

import PasswordChanger from './PasswordChanger';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/services/api', () => ({
  ecommerceApi: {
    reducerPath: 'ecommerceApi',
    reducer: (state = {}) => state,
    middleware:
      () => (next: (action: unknown) => unknown) => (action: unknown) =>
        next(action),
  },
  useUpdatePasswordMutation: () => [vi.fn()],
  useGetProfileQuery: () => [vi.fn()],
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      theme: themeSlice,
      ecommerceApi: (state = {}) => state,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const testStore = createTestStore();
  return render(
    <Provider store={testStore}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('PasswordChanger Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders password changer component', () => {
    renderWithProviders(<PasswordChanger />);

    const changePasswordButton = screen.getByText('Change password');
    expect(changePasswordButton).toBeInTheDocument();
  });

  it('renders change password button', () => {
    renderWithProviders(<PasswordChanger />);

    const button = screen.getByRole('button', { name: 'Change password' });
    expect(button).toBeInTheDocument();
  });

  it('button is clickable', () => {
    renderWithProviders(<PasswordChanger />);

    const button = screen.getByRole('button', { name: 'Change password' });
    expect(button).not.toBeDisabled();
  });
});
