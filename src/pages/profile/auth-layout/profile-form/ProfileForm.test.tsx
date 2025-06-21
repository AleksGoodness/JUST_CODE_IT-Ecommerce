import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs, { Dayjs } from 'dayjs';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from '@/redux/store';

import ProfileForm from './ProfileForm';

vi.mock('react-toastify');
vi.mock('@mui/x-date-pickers/DatePicker', () => ({
  default: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
  }) => (
    <input
      aria-label={label}
      data-testid="date-picker"
      onChange={e => onChange(dayjs(e.target.value))}
      value={value?.format('YYYY-MM-DD') || ''}
    />
  ),
}));

const mockCustomer = {
  id: 'test-id',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  dateOfBirth: '1990-01-01',
  version: 1,
};

describe('ProfileForm', () => {
  beforeEach(() => {
    store.dispatch({
      type: 'auth/setCustomer',
      payload: mockCustomer,
    });
    store.dispatch({
      type: 'auth/setIsEditProfile',
      payload: true,
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ProfileForm />
          </LocalizationProvider>
        </MemoryRouter>
      </Provider>,
    );
  };

  it('should render form fields with initial values', async () => {
    renderComponent();

    // Проверяем текстовые поля
    expect(await screen.findByLabelText(/First name/i)).toHaveValue(
      mockCustomer.firstName,
    );
    expect(screen.getByLabelText(/Last name/i)).toHaveValue(
      mockCustomer.lastName,
    );
    expect(screen.getByLabelText(/Email/i)).toHaveValue(mockCustomer.email);
  });

  it('should disable fields when isEditProfile is false', async () => {
    store.dispatch({
      type: 'auth/setIsEditProfile',
      payload: false,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByLabelText(/First name/i)).toBeDisabled();
      expect(screen.getByLabelText(/Last name/i)).toBeDisabled();
      expect(screen.getByLabelText(/Email/i)).toBeDisabled();
    });
  });

  it('should reset form values', async () => {
    renderComponent();

    const firstNameInput = screen.getByLabelText(/First name/i);
    fireEvent.change(firstNameInput, { target: { value: 'Changed' } });
    fireEvent.click(screen.getByText(/reset/i));

    await waitFor(() => {
      expect(firstNameInput).toHaveValue(mockCustomer.firstName);
    });
  });
});
