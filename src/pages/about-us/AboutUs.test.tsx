import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import AboutUs from './AboutUs';
import { IDeveloper } from './components/about-us-details/AboutUsDetails';

describe('about us page', () => {
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
        <AboutUs />
      </MemoryRouter>,
    );
  };
  it('AboutUs have link to rs', async () => {
    const links = await renderComponent().findAllByRole('link');
    expect(links.length).toBe(7);
  });
});
