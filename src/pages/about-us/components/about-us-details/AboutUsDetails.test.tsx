import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import AboutUsDetails, { IDeveloper } from './AboutUsDetails';

describe('about us details', () => {
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
        <AboutUsDetails />
      </MemoryRouter>,
    );
  };
  it('about us details have 2 buttons', async () => {
    const buttons = await renderComponent().findAllByRole('button');
    expect(buttons.length).toBe(2);
  });
  it('has proper developer name', async () => {
    const developerName = await renderComponent().findByText(
      mockDeveloper.name,
    );
    expect(developerName).toBeInTheDocument();
  });
});
