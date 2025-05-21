import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Wrapper } from '../../__test__/test_utils';
import AuthInput from './auth_input';

test('AuthInput renders correctly', () => {
  render(
    <Wrapper>
      <AuthInput label="Email" name="email" />
      <AuthInput label="Password" name="password" />
    </Wrapper>,
  );

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});
