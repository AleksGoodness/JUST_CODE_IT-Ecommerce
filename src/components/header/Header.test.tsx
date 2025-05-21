import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import LogoMain from './LogoMain';

test('Header to be in the document', () => {
  render(<LogoMain />);

  expect(screen.getByRole('link', { hidden: true })).toBeInTheDocument();
});
