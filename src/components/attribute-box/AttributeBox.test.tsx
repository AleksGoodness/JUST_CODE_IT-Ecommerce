import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AttributeBox from './AttributeBox';

describe('AttributeBox', () => {
  const mockAttributes = [
    { name: 'soil', value: 'loamy' },
    { name: 'temp', value: 22 },
    { name: 'climate', value: 'temperate' },
    { name: 'light', value: 'full sun' },
    { name: 'height', value: 150 },
    { name: 'watering', value: 'weekly' },
  ];

  it('displays all provided attributes', () => {
    render(<AttributeBox attributes={mockAttributes} />);
    expect(screen.getByText('soil type:')).toBeInTheDocument();
    expect(screen.getByText('loamy')).toBeInTheDocument();
    expect(screen.getByText('optimal temperature °C:')).toBeInTheDocument();
    expect(screen.getByText('22')).toBeInTheDocument();
  });

  it('handles numeric values correctly', () => {
    render(<AttributeBox attributes={[{ name: 'height', value: 150 }]} />);
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('handles string values correctly', () => {
    render(<AttributeBox attributes={[{ name: 'soil', value: 'sandy' }]} />);
    expect(screen.getByText('sandy')).toBeInTheDocument();
  });
});
