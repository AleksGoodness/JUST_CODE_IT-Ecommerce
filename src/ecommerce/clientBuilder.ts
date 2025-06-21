import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  TokenCache,
  TokenStore,
} from '@commercetools/ts-client';

import { ELocalStorage } from '../services/interfaces/createCart.interface';
import { anonymousScopes, customerScopes } from './scopes';

const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

const projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;
const adminScope: string = import.meta.env.VITE_CTP_SCOPES;

const hostAuth: string = import.meta.env.VITE_CTP_AUTH_URL;
const hostApi: string = import.meta.env.VITE_CTP_API_URL;

const customerClientId = import.meta.env.VITE_CTP_CUSTOMER_CLIENT_ID;
const customerClientSecret = import.meta.env.VITE_CTP_CUSTOMER_CLIENT_SECRET;

const anonymousClientId = import.meta.env.VITE_CTP_ANONYMOUS_CLIENT_ID;
const anonymousClientSecret = import.meta.env.VITE_CTP_ANONYMOUS_CLIENT_SECRET;

export const tokenCache: TokenCache = {
  get: (): TokenStore => {
    const cachedData = localStorage.getItem(ELocalStorage.ctpToken);
    return cachedData
      ? JSON.parse(cachedData)
      : { token: '', expirationTime: 0 };
  },
  set: (cache: TokenStore): void => {
    localStorage.setItem(ELocalStorage.ctpToken, JSON.stringify(cache));
  },
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: hostApi,
  httpClient: fetch,
};
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

export const createClientWithToken = () => {
  return new ClientBuilder()
    .withRefreshTokenFlow({
      host: hostAuth,
      projectKey,
      credentials: {
        clientId: customerClientId,
        clientSecret: customerClientSecret,
      },
      refreshToken: tokenCache.get().refreshToken || '',
      tokenCache: tokenCache,
    })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const createAnonymousClient = () => {
  return new ClientBuilder()
    .withAnonymousSessionFlow({
      host: hostAuth,
      projectKey,
      credentials: {
        clientId: anonymousClientId,
        clientSecret: anonymousClientSecret,
      },

      tokenCache: tokenCache,
      scopes: anonymousScopes,
    })
    .withHttpMiddleware({
      host: hostApi,
      httpClient: fetch,
    })
    .build();
};
