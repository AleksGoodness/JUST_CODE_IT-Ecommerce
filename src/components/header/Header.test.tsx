import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import Header from './Header';

test('Header to be in the document', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  expect(screen.getByRole('banner')).toBeInTheDocument();
});
