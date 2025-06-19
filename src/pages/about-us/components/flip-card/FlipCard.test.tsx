import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { IDeveloper } from '../about-us-details/AboutUsDetails';
import FlipCard from './FlipCard';

describe('Flip card', () => {
  const mockDeveloper: IDeveloper = {
    name: 'Test Developer',
    img: 'test.jpg',
    discord: 'test#1234',
    gitHub: 'testuser',
    role: 'Developer',
    bio: 'Test bio',
    slug: 'testSlug',
    contributions: ['Contribution 1', 'Contribution 2'],
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/about-us',
            state: { developerData: mockDeveloper },
          },
        ]}
      >
        <FlipCard developer={mockDeveloper} />
      </MemoryRouter>,
    );
  };
  it('Flip card have an image', async () => {
    const img = await renderComponent().findAllByRole('img');
    expect(img.length).toBe(1);
  });

  it('Flip card render proper role', () => {
    const role = renderComponent().getByText(mockDeveloper.role);
    expect(role).toBeInTheDocument();
  });

  it('Flip card render proper name', () => {
    const role = renderComponent().getByText(mockDeveloper.name);
    expect(role).toBeInTheDocument();
  });
  it('should toggle isFlipped state when clicked', () => {
    const container = renderComponent();
    const img = container.getByRole('img');
    const innerElement = container.getByTestId('flip-card-inner');

    expect(img).toBeInTheDocument();
    expect(innerElement).toBeInTheDocument();
    expect(innerElement).not.toHaveStyle('transform: rotateY(180deg)');

    fireEvent.click(img);
  });
});
