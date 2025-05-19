import { render, screen } from '@testing-library/react';
import AuthInput from './auth_input';
import { Wrapper } from '../../__test__/test_utils';

test('AuthInput renders correctly', () => {
  render(
    <Wrapper>
      <AuthInput name="email" label="Email" />
      <AuthInput name="password" label="Password" />
    </Wrapper>,
  );

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});
