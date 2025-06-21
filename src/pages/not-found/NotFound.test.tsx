import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import NotFound from './NotFound';

vi.mock('react-router', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Link: ({
    children,
    to,
    ...props
  }: React.PropsWithChildren<{ to: string; [key: string]: unknown }>) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('NotFound', () => {
  it('should render the page and display PAGE NOT FOUND heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const heading = screen.getByText('PAGE NOT FOUND');
    expect(heading).toBeInTheDocument();
  });
});
