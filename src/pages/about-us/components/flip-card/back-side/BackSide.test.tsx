import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { IDeveloper } from '../../about-us-details/AboutUsDetails';
import BackSide from './BackSide';

const mockProps: IDeveloper = {
  name: 'Test Developer',
  img: 'test.jpg',
  discord: 'test#1234',
  gitHub: 'testuser',
  role: 'Developer',
  bio: 'Test bio',
  slug: 'testSlug',
  contributions: ['Contribution 1', 'Contribution 2'],
};

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('BackSide', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <BackSide {...mockProps} />
      </MemoryRouter>,
    );
  };

  it('should render 3 buttons', async () => {
    renderComponent();
    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('should render read more button', async () => {
    renderComponent();
    const readMoreBtn = await screen.findByText(/read more/i);
    expect(readMoreBtn).toBeInTheDocument();
  });

  it('should render bio text', async () => {
    renderComponent();
    const bio = await screen.findByText(mockProps.bio);
    expect(bio).toBeInTheDocument();
  });

  it('should call navigate with correct props when read more button is clicked', async () => {
    renderComponent();
    const readMoreBtn = await screen.findByText(/read more/i);

    fireEvent.click(readMoreBtn);

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith(mockProps.slug, {
      state: {
        developerData: mockProps,
      },
    });
  });
});
