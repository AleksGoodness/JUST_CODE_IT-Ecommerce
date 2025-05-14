export interface Customer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  customer: Customer | null;
  isLoading: boolean;
  error: string | null;
}

export interface IUser {
  id: string;
  name: string;
  scope: string;
  createdAt: string;
  accessTokenValiditySeconds: number;
  refreshTokenValiditySeconds: number;
}

export interface IUserReducer {
  user: IUser | null;
}
