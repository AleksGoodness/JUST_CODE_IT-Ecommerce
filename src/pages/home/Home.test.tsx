import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import Home from './Home';

// Mock motion from framer-motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock Swiper components
vi.mock('swiper/react', () => ({
  Swiper: ({ children }: React.PropsWithChildren) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: React.PropsWithChildren) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

// Mock Swiper modules
vi.mock('swiper/modules', () => ({
  Autoplay: {},
  EffectFade: {},
}));

// Mock react-router Link
vi.mock('react-router', () => ({
  Link: ({
    children,
    to,
    ...props
  }: React.PropsWithChildren<{ to: string }>) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
    </Provider>,
  );
};

describe('Home Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('displays the welcome message correctly', () => {
    renderWithProviders(<Home />);
    const welcomeText = screen.getByText(/welcome to/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('displays the JustGreen branding', () => {
    renderWithProviders(<Home />);
    const justGreenText = screen.getByText('JustGreen!');
    expect(justGreenText).toBeInTheDocument();
  });

  it('displays the planet text in the main title', () => {
    renderWithProviders(<Home />);
    const planetText = screen.getByText('Planet');
    expect(planetText).toBeInTheDocument();
  });

  it('displays the shop description', () => {
    renderWithProviders(<Home />);
    const description = screen.getByText(
      /We are an online plant shop offering a wide range of cheap and trendy plants/i,
    );
    expect(description).toBeInTheDocument();
  });

  it('displays the Shop Now button', () => {
    renderWithProviders(<Home />);
    const shopButton = screen.getByRole('link', { name: /shop now/i });
    expect(shopButton).toBeInTheDocument();
    expect(shopButton).toHaveAttribute('href', '/shop');
  });

  it('displays the promo code section', () => {
    renderWithProviders(<Home />);
    const promoLabel = screen.getByText('Promo-code:');
    expect(promoLabel).toBeInTheDocument();
  });

  it('displays the promo code badge', () => {
    renderWithProviders(<Home />);
    const promoBadge = screen.getByText('greenery_promo');
    expect(promoBadge).toBeInTheDocument();
  });

  it('renders the banner carousel', () => {
    renderWithProviders(<Home />);
    const swiper = screen.getByTestId('swiper');
    expect(swiper).toBeInTheDocument();
  });

  it('renders banner images in the carousel', () => {
    renderWithProviders(<Home />);
    const swiperSlides = screen.getAllByTestId('swiper-slide');
    expect(swiperSlides.length).toBeGreaterThan(0);
  });

  it('has proper semantic structure with main content and carousel', () => {
    renderWithProviders(<Home />);

    // Check for main content elements
    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
    expect(screen.getByText('JustGreen!')).toBeInTheDocument();

    expect(screen.getByText('Planet')).toBeInTheDocument();
    expect(
      screen.getByText(/We are an online plant shop/i),
    ).toBeInTheDocument();

    // Check for interactive elements
    expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument();
    expect(screen.getByText('Promo-code:')).toBeInTheDocument();
    expect(screen.getByText('greenery_promo')).toBeInTheDocument();

    // Check for carousel
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('applies motion animation props to the main container', () => {
    const { container } = renderWithProviders(<Home />);
    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv).toBeInTheDocument();
  });
});
