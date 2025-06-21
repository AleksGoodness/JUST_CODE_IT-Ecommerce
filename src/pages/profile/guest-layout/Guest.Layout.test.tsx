import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import GuestLayout from './GuestLayout';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('GuestLayout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should show countdown and navigate when reaches 0', async () => {
    render(
      <MemoryRouter>
        <GuestLayout />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Auto return after:/i)).toHaveTextContent(
      'Auto return after: 5',
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/Auto return after:/i)).toHaveTextContent(
      'Auto return after: 4',
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText(/Auto return after:/i)).toHaveTextContent(
      'Auto return after: 1',
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should have return button', () => {
    render(
      <MemoryRouter>
        <GuestLayout />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('button', { name: /Go Back/i }),
    ).toBeInTheDocument();
  });

  it('should navigate when button clicked', async () => {
    render(
      <MemoryRouter>
        <GuestLayout />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /Go Back/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
