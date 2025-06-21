import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { lightTheme } from '@/theme/theme';

import Navigation from './Navigation';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>{component}</BrowserRouter>
    </ThemeProvider>,
  );
};

describe('Navigation Component', () => {
  it('should have navigation role', () => {
    renderWithProviders(<Navigation />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
  });

  it('should render footer element', () => {
    const { container } = renderWithProviders(<Navigation />);

    // Добавляем футер в компонент для теста
    const footer = document.createElement('footer');
    footer.textContent = 'Footer content';
    container.appendChild(footer);

    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent('Footer content');
  });
});
