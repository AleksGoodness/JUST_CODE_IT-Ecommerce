import {
  ClientBuilder,
  createHttpMiddleware,
  TokenCache,
  TokenStore,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';
import { customerScopes } from './scopes';

const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;
const adminScope: string = import.meta.env.VITE_CTP_SCOPES;

const hostAuth: string = import.meta.env.VITE_CTP_AUTH_URL;
const hostApi: string = import.meta.env.VITE_CTP_API_URL;

const customerClientId = import.meta.env.VITE_CTP_CUSTOMER_CLIENT_ID;
const customerClientSecret = import.meta.env.VITE_CTP_CUSTOMER_CLIENT_SECRET;

const tokenCache: TokenCache = {
  get: (): TokenStore => {
    const cachedData = localStorage.getItem('ctpTokenCache');
    return cachedData
      ? JSON.parse(cachedData)
      : { token: '', expirationTime: 0 };
  },
  set: (cache: TokenStore): void => {
    localStorage.setItem('ctpTokenCache', JSON.stringify(cache));
  },
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: hostApi,
  httpClient: fetch,
};
// Configure authMiddlewareOptions
export const createRegistrationClient = () => {
  return new ClientBuilder()
    .withClientCredentialsFlow({
      host: hostAuth,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes: [adminScope],
      httpClient: fetch,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const loginCustomerClient = (email: string, password: string) => {
  return new ClientBuilder()
    .withPasswordFlow({
      host: hostAuth,
      projectKey,
      credentials: {
        clientId: customerClientId,
        clientSecret: customerClientSecret,
        user: { username: email, password },
      },
      scopes: customerScopes,
      httpClient: fetch,
      tokenCache: tokenCache,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};
