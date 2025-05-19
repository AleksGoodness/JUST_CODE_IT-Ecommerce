import {
  ClientBuilder,
  TokenCache,
  TokenStore,
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

export const tokenCache: TokenCache = {
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

export const silentLogin = async () => {
  const tokenStore = tokenCache.get();

  if (!tokenStore || !tokenStore.token) {
    throw new Error('Token does not exist');
  }

  const isTokenExpired = tokenStore.expirationTime
    ? tokenStore.expirationTime < Date.now()
    : true;

  if (!isTokenExpired) {
    return new ClientBuilder()
      .withExistingTokenFlow(tokenStore.token, { force: true })
      .withHttpMiddleware({ host: hostAuth, httpClient: fetch })
      .build();
  }

  if (tokenStore.refreshToken) {
    try {
      const newToken = await refreshToken(tokenStore.refreshToken);
      tokenCache.set(newToken);

      return new ClientBuilder()
        .withExistingTokenFlow(newToken.access_token, { force: true })
        .withHttpMiddleware({ host: hostAuth, httpClient: fetch })
        .build();
    } catch (error) {
      // tokenCache.clear(); // Важно очистить кэш при ошибке
      throw new Error('Session expired. Need to login.');
    }
  }

  // tokenCache.clear(); // Очищаем кэш если refreshToken отсутствует
  throw new Error("Token expired, refreshToken doesn't exist");
};

const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${hostAuth}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${customerClientId}:${customerClientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) throw new Error('Error with update token');
  return response.json();
};
