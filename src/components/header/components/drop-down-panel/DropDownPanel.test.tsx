import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import DropDownPanel from './DropDownPanel';

const mockSetIsOpen = vi.fn();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('DropDownPanel Component', () => {
  beforeEach(() => {
    mockSetIsOpen.mockClear();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
  });

  it('calls setIsOpen when clicking outside the panel', () => {
    const { container } = renderWithProviders(
      <DropDownPanel isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    const outerBox = container.firstChild as HTMLElement;
    fireEvent.click(outerBox);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('has correct styling classes', () => {
    const { container } = renderWithProviders(
      <DropDownPanel isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    const outerBox = container.firstChild as HTMLElement;
    expect(outerBox).toHaveClass('MuiBox-root');
  });

  it('renders with proper backdrop styling', () => {
    const { container } = renderWithProviders(
      <DropDownPanel isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    const innerBox = container.querySelector(
      '[class*="MuiBox"]',
    ) as HTMLElement;
    expect(innerBox).toBeInTheDocument();
  });

  it('has responsive display properties', () => {
    const { container } = renderWithProviders(
      <DropDownPanel isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    const outerBox = container.firstChild as HTMLElement;
    expect(outerBox).toHaveStyle({ position: 'fixed' });
  });

  it('handles window resize events', () => {
    renderWithProviders(
      <DropDownPanel isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    fireEvent(window, new Event('resize'));

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('cleans up resize event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderWithProviders(
      <DropDownPanel isOpen={true} setIsOpen={mockSetIsOpen} />,
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });
});
