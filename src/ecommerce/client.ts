import {
  createAuthMiddlewareForClientCredentialsFlow,
  createAuthMiddlewareForPasswordFlow,
  createClient,
  createHttpMiddleware,
} from '@commercetools/ts-client';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ');
const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;

const hostApi = import.meta.env.VITE_CTP_API_URL;

export const client = createClient({
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: hostAuth,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
    }),
    createHttpMiddleware({
      host: hostApi,
    }),
  ],
});

export const loginClient = (email: string, password: string) => {
  return createClient({
    middlewares: [
      createAuthMiddlewareForPasswordFlow({
        host: hostAuth,
        projectKey,
        credentials: {
          clientId,
          clientSecret,
          user: { username: email, password },
        },
        scopes: [],
      }),
      createHttpMiddleware({ host: hostApi }),
    ],
  });
};
