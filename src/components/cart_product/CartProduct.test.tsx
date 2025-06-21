import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LineItemModified } from '@/pages/basket/utils/clearCartObject';
import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import CartProduct from './CartProduct';

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

const mockProducts: LineItemModified[] = [
  {
    id: 'item-1',
    productId: 'product-1',
    productKey: 'key-1',
    name: 'Test Product 1',
    price: 2500,
    discount: undefined,
    image: 'test-image-1.jpg',
    quantity: 2,
    totalPrice: 5000,
    currency: 'USD',
  },
  {
    id: 'item-2',
    productId: 'product-2',
    productKey: 'key-2',
    name: 'Test Product 2',
    price: 1500,
    discount: 500,
    image: 'test-image-2.jpg',
    quantity: 1,
    totalPrice: 1000,
    currency: 'USD',
  },
];

describe('CartProduct Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders empty cart message when no products', () => {
    renderWithProviders(<CartProduct products={[]} />);

    const emptyMessage = screen.getByText(
      'Your cart is empty — time to go shopping!',
    );
    expect(emptyMessage).toBeInTheDocument();
  });

  it('navigates to shop when empty cart message is clicked', () => {
    renderWithProviders(<CartProduct products={[]} />);

    const emptyMessage = screen.getByText(
      'Your cart is empty — time to go shopping!',
    );
    fireEvent.click(emptyMessage);

    expect(mockNavigate).toHaveBeenCalledWith('/shop');
  });

  it('renders products when cart has items', () => {
    renderWithProviders(<CartProduct products={mockProducts} />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('displays product names as clickable links', () => {
    renderWithProviders(<CartProduct products={mockProducts} />);

    const product1Link = screen.getByText('Test Product 1');
    const product2Link = screen.getByText('Test Product 2');

    expect(product1Link).toBeInTheDocument();
    expect(product2Link).toBeInTheDocument();
  });

  it('navigates to product details when product name is clicked', () => {
    renderWithProviders(<CartProduct products={mockProducts} />);

    const product1Link = screen.getByText('Test Product 1');
    fireEvent.click(product1Link);

    expect(mockNavigate).toHaveBeenCalledWith('/shop/all/Test Product 1', {
      state: 'product-1',
    });
  });

  it('displays product images', () => {
    const { container } = renderWithProviders(
      <CartProduct products={mockProducts} />,
    );

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'test-image-1.jpg');
    expect(images[1]).toHaveAttribute('src', 'test-image-2.jpg');
  });

  it('does not show empty cart message when products exist', () => {
    renderWithProviders(<CartProduct products={mockProducts} />);

    const emptyMessage = screen.queryByText(
      'Your cart is empty — time to go shopping!',
    );
    expect(emptyMessage).not.toBeInTheDocument();
  });

  it('renders with proper grid structure', () => {
    const { container } = renderWithProviders(
      <CartProduct products={mockProducts} />,
    );

    const gridContainer = container.querySelector(
      '[class*="MuiGrid-container"]',
    );
    expect(gridContainer).toBeInTheDocument();
  });

  it('handles single quantity products correctly', () => {
    const singleProduct: LineItemModified[] = [
      {
        id: 'item-3',
        productId: 'product-3',
        productKey: 'key-3',
        name: 'Single Product',
        price: 1000,
        discount: undefined,
        image: 'test-image-3.jpg',
        quantity: 1,
        totalPrice: 1000,
        currency: 'USD',
      },
    ];

    renderWithProviders(<CartProduct products={singleProduct} />);

    expect(screen.getByText('Single Product')).toBeInTheDocument();
    expect(screen.getByText('10.00')).toBeInTheDocument();
  });
});
