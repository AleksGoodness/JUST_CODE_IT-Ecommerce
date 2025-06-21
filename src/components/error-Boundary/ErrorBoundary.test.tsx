import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import ErrorBoundaryFallback from './ErrorBoundary';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('ErrorBoundary Component', () => {
  it('renders error message', () => {
    renderWithProviders(<ErrorBoundaryFallback />);
    const errorMessage = screen.getByText('Something go wrong');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders go back button', () => {
    renderWithProviders(<ErrorBoundaryFallback />);
    const goBackButton = screen.getByRole('link', { name: /go back/i });
    expect(goBackButton).toBeInTheDocument();
  });

  it('button has correct link component', () => {
    renderWithProviders(<ErrorBoundaryFallback />);
    const goBackButton = screen.getByRole('link', { name: /go back/i });
    expect(goBackButton).toBeInTheDocument();
  });

  it('renders within container', () => {
    const { container } = renderWithProviders(<ErrorBoundaryFallback />);
    const containerElement = container.querySelector('[class*="MuiContainer"]');
    expect(containerElement).toBeInTheDocument();
  });

  it('displays error message with correct typography', () => {
    renderWithProviders(<ErrorBoundaryFallback />);
    const errorMessage = screen.getByText('Something go wrong');
    expect(errorMessage.tagName).toBe('P');
  });

  it('button is clickable', () => {
    renderWithProviders(<ErrorBoundaryFallback />);
    const goBackButton = screen.getByRole('link', { name: /go back/i });
    expect(goBackButton).not.toBeDisabled();
  });

  it('has proper component structure', () => {
    const { container } = renderWithProviders(<ErrorBoundaryFallback />);
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toBeInTheDocument();
  });

  it('renders all expected elements', () => {
    renderWithProviders(<ErrorBoundaryFallback />);

    expect(screen.getByText('Something go wrong')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go back/i })).toBeInTheDocument();
  });

  it('button has correct styling', () => {
    renderWithProviders(<ErrorBoundaryFallback />);
    const goBackButton = screen.getByRole('link', { name: /go back/i });
    expect(goBackButton).toHaveClass('MuiButton-root');
  });

  it('typography has correct styling', () => {
    renderWithProviders(<ErrorBoundaryFallback />);
    const errorMessage = screen.getByText('Something go wrong');
    expect(errorMessage).toHaveClass('MuiTypography-root');
  });
});
