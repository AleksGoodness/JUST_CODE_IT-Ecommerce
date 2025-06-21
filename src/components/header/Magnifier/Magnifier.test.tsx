import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import { store } from '@/redux/store';
import { lightTheme } from '@/theme/theme';

import MagnifierIcon from './Magnifier';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
    </Provider>,
  );
};

describe('Magnifier Component', () => {
  it('renders', () => {
    const { container } = renderWithProviders(<MagnifierIcon />);
    const svgIcon = container.querySelector('[class*="MuiSvgIcon"]');
    expect(svgIcon).toBeInTheDocument();
  });
});
