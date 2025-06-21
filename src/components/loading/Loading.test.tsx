import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Loading from './Loading';

describe('Loading', () => {
  it('render loader', () => {
    render(<Loading />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
