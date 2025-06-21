import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import Header from './Header';

const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();

vi.mock('react-router', () => ({
  useLocation: () => mockUseLocation(),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  NavLink: ({
    children,
    to,
    ...props
  }: React.PropsWithChildren<{ to: string; [key: string]: unknown }>) => (
    <a href={to} {...props}>
      {children}
    </a>
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

describe('Header Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseLocation.mockReturnValue({ pathname: '/' });
  });

  it('renders header element', () => {
    renderWithProviders(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders logo with correct alt text', () => {
    renderWithProviders(<Header />);

    const logo = screen.getByAltText('JustCodeIt JustGreen');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation with nav role', () => {
    renderWithProviders(<Header />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('shop')).toBeInTheDocument();
    expect(screen.getByText('about us')).toBeInTheDocument();
  });

  it('renders menu button', () => {
    renderWithProviders(<Header />);

    const menuButton = screen.getByTestId('MenuRoundedIcon');
    expect(menuButton).toBeInTheDocument();
  });

  it('renders container element', () => {
    const { container } = renderWithProviders(<Header />);

    const containerElement = container.querySelector('[class*="MuiContainer"]');
    expect(containerElement).toBeInTheDocument();
  });

  it('closes dropdown panel when menu button is clicked again', () => {
    const { container } = renderWithProviders(<Header />);

    const menuButton = screen.getByTestId('MenuRoundedIcon').closest('button');

    if (menuButton) {
      fireEvent.click(menuButton);
      fireEvent.click(menuButton);
    }

    const dropDownPanel = container.querySelector('[class*="DropDownPanel"]');
    expect(dropDownPanel).not.toBeInTheDocument();
  });

  it('does not show dropdown panel initially', () => {
    const { container } = renderWithProviders(<Header />);

    const dropDownPanel = container.querySelector('[class*="DropDownPanel"]');
    expect(dropDownPanel).not.toBeInTheDocument();
  });

  it('renders Stack component for desktop layout', () => {
    const { container } = renderWithProviders(<Header />);

    const stack = container.querySelector('[class*="MuiStack"]');
    expect(stack).toBeInTheDocument();
  });

  it('menu button is clickable', () => {
    renderWithProviders(<Header />);

    const menuButton = screen.getByTestId('MenuRoundedIcon').closest('button');
    expect(menuButton).not.toBeDisabled();
  });

  it('logo has correct link', () => {
    renderWithProviders(<Header />);

    const logoLink = screen.getByAltText('JustCodeIt JustGreen').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('navigation links have correct hrefs', () => {
    renderWithProviders(<Header />);

    const homeLink = screen.getByText('home').closest('a');
    const shopLink = screen.getByText('shop').closest('a');
    const aboutLink = screen.getByText('about us').closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(shopLink).toHaveAttribute('href', '/shop');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('handles location changes', () => {
    const { rerender } = renderWithProviders(<Header />);

    mockUseLocation.mockReturnValue({ pathname: '/shop' });

    rerender(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('maintains header structure during state changes', () => {
    const { container, rerender } = renderWithProviders(<Header />);

    const initialHeader = container.querySelector('header');
    expect(initialHeader).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    );

    const updatedHeader = container.querySelector('header');
    expect(updatedHeader).toBeInTheDocument();
  });
});
