import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import Cart from './Cart';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
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

describe('Cart Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders cart icon', () => {
    const { container } = renderWithProviders(<Cart />);
    const svgIcon = container.querySelector('[class*="MuiSvgIcon"]');
    expect(svgIcon).toBeInTheDocument();
  });

  it('navigates to cart page when clicked', () => {
    const { container } = renderWithProviders(<Cart />);
    const svgIcon = container.querySelector(
      '[class*="MuiSvgIcon"]',
    ) as HTMLElement;

    fireEvent.click(svgIcon);
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });

  it('accepts and applies custom props', () => {
    const { container } = renderWithProviders(
      <Cart color="primary" fontSize="large" />,
    );
    const svgIcon = container.querySelector('[class*="MuiSvgIcon"]');
    expect(svgIcon).toBeInTheDocument();
  });

  it('renders with default styling', () => {
    const { container } = renderWithProviders(<Cart />);
    const svgIcon = container.querySelector('[class*="MuiSvgIcon"]');
    expect(svgIcon).toHaveClass('MuiSvgIcon-root');
  });

  it('contains SVG path element', () => {
    const { container } = renderWithProviders(<Cart />);
    const svgPath = container.querySelector('path');
    expect(svgPath).toBeInTheDocument();
  });

  it('has correct SVG viewBox', () => {
    const { container } = renderWithProviders(<Cart />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('uses currentColor for fill', () => {
    const { container } = renderWithProviders(<Cart />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('handles multiple clicks correctly', () => {
    const { container } = renderWithProviders(<Cart />);
    const svgIcon = container.querySelector(
      '[class*="MuiSvgIcon"]',
    ) as HTMLElement;

    fireEvent.click(svgIcon);
    fireEvent.click(svgIcon);

    expect(mockNavigate).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenNthCalledWith(1, '/cart');
    expect(mockNavigate).toHaveBeenNthCalledWith(2, '/cart');
  });
});
