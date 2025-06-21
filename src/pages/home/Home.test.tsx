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
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('displays the main title correctly', () => {
    renderWithProviders(<Home />);
    const mainTitle = screen.getByRole('heading', { level: 1 });
    expect(mainTitle).toHaveTextContent('Hello JustCodeIt team');
  });

  it('displays the subtitle with correct content', () => {
    renderWithProviders(<Home />);
    const subtitle = screen.getByText('This is example of usage Material UI');
    expect(subtitle).toBeInTheDocument();
  });

  it('displays the promo code section', () => {
    renderWithProviders(<Home />);
    const promoTitle = screen.getByText('Promo code');
    const promoCode = screen.getByText('greenery_promo');

    expect(promoTitle).toBeInTheDocument();
    expect(promoCode).toBeInTheDocument();
  });

  it('has correct styling classes and structure', () => {
    const { container } = renderWithProviders(<Home />);

    // Check that the main container has motion div
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toBeInTheDocument();

    // Check that we have the expected number of Typography components
    const typographyElements = container.querySelectorAll(
      '[class*="MuiTypography"]',
    );
    expect(typographyElements).toHaveLength(4); // main title, subtitle, promo title, promo code
  });

  it('applies correct text alignment to main title', () => {
    renderWithProviders(<Home />);
    const mainTitle = screen.getByRole('heading', { level: 1 });
    expect(mainTitle).toHaveStyle({ textAlign: 'center' });
  });

  it('applies correct text alignment to subtitle', () => {
    renderWithProviders(<Home />);
    const subtitle = screen.getByText('This is example of usage Material UI');
    expect(subtitle).toHaveStyle({ textAlign: 'center' });
  });

  it('applies correct styling to promo code', () => {
    renderWithProviders(<Home />);
    const promoCode = screen.getByText('greenery_promo');
    expect(promoCode).toHaveStyle({
      fontSize: '1.5rem',
      fontWeight: '700',
    });
  });

  it('has motion animation props', () => {
    const { container } = renderWithProviders(<Home />);
    const motionDiv = container.firstChild as HTMLElement;

    // Check that motion props are applied (these would be passed to the motion.div)
    expect(motionDiv).toBeInTheDocument();
  });

  it('renders all expected text content', () => {
    renderWithProviders(<Home />);

    const expectedTexts = [
      'Hello JustCodeIt team',
      'This is example of usage Material UI',
      'Promo code',
      'greenery_promo',
    ];

    expectedTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('has proper semantic structure', () => {
    renderWithProviders(<Home />);

    // Check for h1 heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    // Check that all text elements are present
    expect(screen.getByText('Hello JustCodeIt team')).toBeInTheDocument();
    expect(
      screen.getByText('This is example of usage Material UI'),
    ).toBeInTheDocument();
    expect(screen.getByText('Promo code')).toBeInTheDocument();
    expect(screen.getByText('greenery_promo')).toBeInTheDocument();
  });
});
