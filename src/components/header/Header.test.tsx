import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Header from './Header';

test('Header рендерится корректно', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  expect(screen.getByRole('banner')).toBeInTheDocument();
});
