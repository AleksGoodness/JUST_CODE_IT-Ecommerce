import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import IconsStack from './IconsStack';

vi.mock('@/redux/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => ({ customer: null }),
}));

vi.mock('@/services/api', async importOriginal => {
  const actual = await importOriginal<typeof import('@/services/api')>();
  return {
    ...actual,
    useGetActiveCartQuery: () => ({
      data: {
        lineItems: [{ quantity: 2 }, { quantity: 1 }, { quantity: 3 }],
      },
    }),
  };
});

vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
  NavLink: ({
    children,
    to,
    ...props
  }: React.PropsWithChildren<{ to: string; [key: string]: unknown }>) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('IconsStack Component', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<IconsStack />);
    expect(container).toBeInTheDocument();
  });
});
