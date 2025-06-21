import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Saver from './Saver';

describe('Saver', () => {
  it('should render an SVG element', () => {
    render(<Saver />);

    const svgElement = screen.getByTestId('saver');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.tagName).toBe('svg');
  });
});
