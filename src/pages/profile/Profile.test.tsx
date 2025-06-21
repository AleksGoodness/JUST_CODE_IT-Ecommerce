import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Мокаем Redux хуки
vi.mock('@/redux/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

// Мокаем компоненты
vi.mock('@/components/loading/Loading', () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock('@/components/title/Title', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <h1 data-testid="title">{children}</h1>
  ),
}));

vi.mock('./auth-layout/AuthLayout', () => ({
  default: () => <div data-testid="auth-layout">Auth Layout</div>,
}));

vi.mock('./guest-layout/GuestLayout', () => ({
  default: () => <div data-testid="guest-layout">Guest Layout</div>,
}));

import { useAppSelector } from '@/redux/hooks';

import Profile from './Profile';

// Получаем моки после импорта

const mockUseAppSelector = vi.mocked(useAppSelector);

describe('Profile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render title "Profile"', () => {
    mockUseAppSelector.mockReturnValue({
      customer: null,
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    expect(screen.getByTestId('title')).toHaveTextContent('Profile');
  });

  it('should show "View mode" chip when not in edit mode', () => {
    mockUseAppSelector.mockReturnValue({
      customer: { id: '1', email: 'test@test.com' },
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    expect(screen.getByText('View mode')).toBeInTheDocument();
  });

  it('should show "Edit mode" chip when in edit mode', () => {
    mockUseAppSelector.mockReturnValue({
      customer: { id: '1', email: 'test@test.com' },
      isLoading: false,
      isEditProfile: true,
    });

    render(<Profile />);

    expect(screen.getByText('Edit mode')).toBeInTheDocument();
  });

  it('should render Edit button', () => {
    mockUseAppSelector.mockReturnValue({
      customer: { id: '1', email: 'test@test.com' },
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('should disable Edit button when no customer', () => {
    mockUseAppSelector.mockReturnValue({
      customer: null,
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    expect(editButton).toBeDisabled();
  });

  it('should enable Edit button when customer exists', () => {
    mockUseAppSelector.mockReturnValue({
      customer: { id: '1', email: 'test@test.com' },
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    expect(editButton).not.toBeDisabled();
  });

  it('should show loading when isLoading is true', () => {
    mockUseAppSelector.mockReturnValue({
      customer: null,
      isLoading: true,
      isEditProfile: false,
    });

    render(<Profile />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should not show loading when isLoading is false', () => {
    mockUseAppSelector.mockReturnValue({
      customer: null,
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should render AuthLayout when customer exists', () => {
    mockUseAppSelector.mockReturnValue({
      customer: { id: '1', email: 'test@test.com' },
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    expect(screen.getByTestId('auth-layout')).toBeInTheDocument();
    expect(screen.queryByTestId('guest-layout')).not.toBeInTheDocument();
  });

  it('should render GuestLayout when no customer', () => {
    mockUseAppSelector.mockReturnValue({
      customer: null,
      isLoading: false,
      isEditProfile: false,
    });

    render(<Profile />);

    expect(screen.getByTestId('guest-layout')).toBeInTheDocument();
    expect(screen.queryByTestId('auth-layout')).not.toBeInTheDocument();
  });
});
