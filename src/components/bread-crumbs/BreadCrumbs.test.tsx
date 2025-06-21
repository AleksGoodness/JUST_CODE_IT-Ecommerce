import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import BreadCrumbs from './BreadCrumbs';

describe('BreadCrumbs', () => {
  it('renders home icon when path is not root', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <BreadCrumbs />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole('link').length).toBe(1);
  });

  it('does not render home icon on root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BreadCrumbs />
      </MemoryRouter>,
    );
    expect(screen.queryByTestId('HomeIcon')).not.toBeInTheDocument();
  });

  it('renders correct breadcrumbs for simple path', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <BreadCrumbs />
      </MemoryRouter>,
    );
    expect(screen.getByText('products')).toBeInTheDocument();
  });

  it('renders correct breadcrumbs for nested path', () => {
    render(
      <MemoryRouter initialEntries={['/products/electronics/phones']}>
        <BreadCrumbs />
      </MemoryRouter>,
    );
    expect(screen.getByText('products')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('phones')).toBeInTheDocument();
  });

  it('decodes URI components correctly', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/products/%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D1%8B',
        ]}
      >
        <BreadCrumbs />
      </MemoryRouter>,
    );
    expect(screen.getByText('телефоны')).toBeInTheDocument();
  });
});
